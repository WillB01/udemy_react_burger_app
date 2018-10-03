import React from 'react';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((ingKey) => {
            console.log(ingKey);
            return( 
                <li>
                    <span style={{textTransform: 'capitalize'}}>
                    {ingKey}</span>: {props.ingredients[ingKey]}
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
                <p>Continue to Checkout</p>
            </React.Fragment>
    
        );
};

export default orderSummary;