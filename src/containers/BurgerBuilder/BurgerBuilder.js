import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    };

    componentDidMount() {
        axios.get('https://react-my-burger-54a57.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data,
                });
            })
            .catch(error => {
                this.setState({error:true});
            });
    }

    updatePurchaseState(uppdatedIngredients) {
        const ingredients = {...uppdatedIngredients};
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((newSum, element) => {
                return newSum + element;
            }, 0);

            this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1; 
        const uppdatedIngredients = {
            ...this.state.ingredients
        };
        uppdatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: uppdatedIngredients
        });
        this.updatePurchaseState(uppdatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1; 
        const uppdatedIngredients = {
            ...this.state.ingredients
        };
        uppdatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: uppdatedIngredients
        });
        this.updatePurchaseState(uppdatedIngredients);
     
    };

    purchaseHandler = () => this.setState({purchasing: true});

    purchaseCancelHandler = () => this.setState({purchasing: false});
    
    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
            // state: {ingredients: this.state.ingredients }
        });

    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for (const key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;  
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:
                                        <Spinner /> ;
        if (this.state.ingredients) {
            burger = ( 
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                        <BuildControls ingredientAdded={this.addIngredientHandler}
                                       ingredientRemove={this.removeIngredientHandler}
                                       disabled={disabledInfo} 
                                       purchasable={this.state.purchasable}
                                       price={this.state.totalPrice}
                                       ordered={this.purchaseHandler} />
                </React.Fragment> );
            orderSummary =  <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        
           
        };
        if (this.state.loading) {
            orderSummary = <Spinner />
        };
        return(
            <React.Fragment>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </React.Fragment>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);