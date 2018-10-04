import React, {Component} from 'react';

import Button from '../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[orderSummary] Will update');
    }
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map((ingKey) => {
            console.log(ingKey);
            return( 
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>
                    {ingKey}</span>: {this.props.ingredients[ingKey]}
                </li>
            );
        });

        return(
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <Button btnType={"Danger"}
                        clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType={"Success"}
                        clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
        );
    };
}
export default OrderSummary;