import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZipCode',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: fals
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                deleveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                        {
                            value: 'fastest', 
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest', 
                            displayValue: 'Cheapest'
                        },
                    ]
                    },
                    value: '',
                    
                },
            },
            loading: false,
        };
    };  

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = 
                this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
          
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

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        } 

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = 
            this.checkValidity(updatedFormElement.value,
                                updatedFormElement.validation);
        console.log(updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});

    }

    render() {
        // const orderForm = this.state.orderForm;
        // let orderFormArr = Object.keys(orderForm).map(key => {
        //     return {id: key, config: orderForm[key]}
        // });

        const orderFormArray = [];
        for (let key in this.state.orderForm) {
            orderFormArray.push({id: key, config: this.state.orderForm[key]});
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="...." value="..." /> */}
                {orderFormArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType} 
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           changed={(event) =>
                                this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success">ORDER</Button>
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