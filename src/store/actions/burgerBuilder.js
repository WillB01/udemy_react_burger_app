import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    };
};

export const removeIngredients = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-54a57.firebaseio.com/ingredients.json')
        .then(res => {
            console.log(res.data);
            dispatch(setIngredients(res.data));
        })
        .catch(error => {
           dispatch(fetchIngredientsFailed());
        });
    };
};