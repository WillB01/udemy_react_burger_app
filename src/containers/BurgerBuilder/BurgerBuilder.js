import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions  from '../../store/actions/index';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
        };
    };

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
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

           return sum > 0;
    }

    purchaseHandler = () => this.setState({purchasing: true});

    purchaseCancelHandler = () => this.setState({purchasing: false});
    
    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'});

    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        
        for (const key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;  
        console.log(this.props.error);
        let burger = this.props.error ? <p>Ingredients can't be loaded</p>:
                                        <Spinner /> ;
        if (this.props.ings) {
            burger = ( 
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                        <BuildControls ingredientAdded={this.props.onIngredientAdded}
                                       ingredientRemove={this.props.onIngredientRemoved}
                                       disabled={disabledInfo} 
                                       purchasable={this.updatePurchaseState(this.props.ings)}
                                       price={this.props.price}
                                       ordered={this.purchaseHandler} />
                </React.Fragment> );
            orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        
           
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

const mapStateToProps = state => {
    return {
        ings: state.brg.ingredients,
        price: state.brg.totalPrice,
        error: state.brg.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => 
        dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => 
        dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())

    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));