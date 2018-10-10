import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/Burgeringredient';

const burger = (props) => {
    console.log(props.ingredients);
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            console.log(igKey);
            return [...Array(props.ingredients[igKey])]
                .map((_, index) => {
                    console.log(transformedIngredients);
                    return <BurgerIngredient key={igKey + index}
                                      type={igKey} />
                });
        })
        .reduce((arr, el) => {
            console.log(`[Inside Reduce] arr: ${arr} --- el: ${el}`)
            return arr.concat(el);
        }, []);
        console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
       transformedIngredients = <p>Please start adding ingredients</p> 
    }

    
    return(
        <div className={classes.Burger} >
            <BurgerIngredient type ="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type ="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);