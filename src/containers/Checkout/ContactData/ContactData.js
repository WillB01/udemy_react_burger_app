import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            adress: {
                street: '',
                postalCode: ''
            },
            loading: false,
        };
    };  

    orderHandler = (e) => {
        e.preventDefault();
         this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Willy Kewl',
                adress: {
                    street: 'Super kewl street 1',
                    zipCode: '34534',
                    country: 'greeenland'
                },
                email: 'kewl@awsome.com'
            },
            deleveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                 });
                 this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
            });
        
    };
    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
                <Button btnType="Success"
                        clicked={this.orderHandler}>ORDER
                </Button>
            </form>);
        if(this.state.loading) {
            form = <Spinner /> ;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                    {form}
            </div>
        );
    };
};
    
export default ContactData;