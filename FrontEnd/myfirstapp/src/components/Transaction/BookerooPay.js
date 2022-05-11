import axios from 'axios';
import React, { Component } from 'react'
import { bookMicroServiceApi } from '../../Utilities/hosts';
import PayPal from './PayPal';
import TransactionsBook from './TransactionsBook';

// payment portal of bookeroo
class BookerooPay extends Component {

    constructor(props){
        super(props);
        this.state = {
            //id of book to be purchased
            booklisting: undefined,
            paypalStatus: undefined,
            paymentId: undefined,
            paymentSuccessful: false,
            price: ""
        }
    }
    
    //get a specific listing
    getBookFromDatabase(id){
        const bookToBePurchased = axios.get(bookMicroServiceApi+`/booklisting/id/${id}`);
        return bookToBePurchased;
    }

    //when the page is launched, show the books in console - TESTING
    componentDidMount(){
        this.getBookFromDatabase(this.props.match.params.id)
        .then(
            response =>{
                this.setState({booklisting: response.data});
                this.setState({price: response.data.listingPrice})
            }
        )
        .catch(
            function(error){
                console.log("An error occured",error);
            }
        )
    }
    //process a transactions and get response 
    processTransaction = (paypalData) => {
        this.setState({paymentId: paypalData.id})
        this.setState({paypalStatus: paypalData.status});
        if (paypalData.status === "COMPLETED"){
            this.setState({paymentSuccessful: true});
        } 
        
    }

    render() {   
        return (
            <div>
                {/* using paypal api to process book */}
                <PayPal priceOfBook={this.state.price}  
                paymentCallBack = {this.processTransaction}/>

                {/* create a purchasing transaction */}
                <TransactionsBook paymentSuccessful={this.state.paymentSuccessful}
                bookListingId= {this.props.match.params.id}
                paymentStatus={this.state.paypalStatus}
                paymentId={this.state.paymentId}
                />
            </div>
            
        )
    }
}

export default BookerooPay;