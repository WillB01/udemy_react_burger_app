import React from 'react';

import Button from '../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((ingKey) => {
            console.log(ingKey);
            return( 
                <li key={ingKey}>
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
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <Button btnType={"Danger"}
                        clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button btnType={"Success"}
                        clicked={props.purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
    
        );
};

export default orderSummary;