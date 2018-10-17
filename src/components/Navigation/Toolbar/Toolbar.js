import React from 'react';      
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerMenu clicked={props.hamBurgerMenuClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;