import React, {Component} from 'react';  
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {


    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    }

    render() {
        let summary = <Redirect to="/" /> ;
        if(this.props.ings) {
            console.log( this.props.purchased)
            const purchasedRedirect = this.props.purchased ?
                 <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                    CheckoutCancelled={this.CheckoutCancelledHandler}
                    CheckoutContinued={this.CheckoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
                </div>
            );
        }
        return(
            <div>
            {summary}
            </div>
        );
    };

}

const mapStateToProps = (state) => {
    return {
        ings: state.brg.ingredients,
        price: state.brg.totalPrice,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);