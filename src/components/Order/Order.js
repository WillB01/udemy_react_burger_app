import React from 'react';
import classes from './Order.css';


const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    };
    
    const ingredientOutput = ingredients.map((ig, index) => {
        return(
            <span key={index}>{ig.name} ({ig.amount}) </span>
        )
    });
    return(
        <div className={classes.Order}>
            {ingredientOutput}
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};
   


export default order;