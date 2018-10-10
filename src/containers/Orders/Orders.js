import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        };
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders);
                this.setState({
                    orders: fetchedOrders,
                    loading: false,
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            })
    }

    render() {
        return(
            <div>
               {this.state.orders.map((order, index) => {
                   return(
                       <Order key={order.id} 
                              ingredients={order.ingredients} 
                              price={+order.price} />
                   )
               })}
            </div>
        );
    };
};

export default withErrorHandler(Orders, axios);