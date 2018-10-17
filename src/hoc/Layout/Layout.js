import React, {Component} from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }
 
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    render() {
        return(
            <Aux>
                <Toolbar hamBurgerMenuClicked={this.sideDrawerOpenHandler}
                         isAuth={this.props.isAuthenticated} />
                <SideDrawer closed={this.sideDrawerClosedHandler}
                            open={this.state.showSideDrawer} 
                            isAuth={this.props.isAuthenticated} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>    
            </Aux>    
        );
    }
        
    
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);