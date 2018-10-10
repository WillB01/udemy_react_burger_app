import React, {Component} from 'react';  
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 0
        };
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            param[0] === 'price' ? price = param[1] : ingredients[param[0]] = +param[1];
        };
        this.setState({
            ingredients: ingredients,
            totalPrice: price,
        });
    }

    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 CheckoutCancelled={this.CheckoutCancelledHandler}
                                 CheckoutContinued={this.CheckoutContinuedHandler}   />
                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => (<ContactData ingredients={this.state.ingredients} 
                                                        totalPrice={this.state.totalPrice}
                                                        {...props} />)} />
            </div>
        );
    };

}

export default Checkout;