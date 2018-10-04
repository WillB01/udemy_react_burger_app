import React from 'react';
import classes from './HamburgerMenu.css';

const hamburgerMenu = (props) => (
    <div className={classes.HamburgerMenu}
         onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);



export default hamburgerMenu;