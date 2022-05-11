import React, { Component } from 'react'
import axios from "axios";
import { bookMicroServiceApi, transactionMicroServiceApi } from "../../Utilities/hosts";
import jwt_decode from "jwt-decode";

 class TransactionsBook extends Component {

    constructor(props){
        super(props);
        this.state = {
          userFirstName: "",
          userLastName:"",
          userAddress:"",
          transactionID:""
        }
        //functions to handle transaction form
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getBook = this.getBook.bind(this);
    }

    //getting book to be purchased by listing id
    getBook(id){
      const itemPurchase = axios.get(bookMicroServiceApi+ `/booklisting/id/${id}`);
      return itemPurchase;
    }
    
    //grab user input
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

  //post user input into transactions API
  onSubmit(e){
    e.preventDefault();
    //fetch user information from form
    const bookToBePurchased = {
        userFirstName: this.state.userFirstName,
        userLastName: this.state.userLastName,
        userAddress: this.state.userAddress,
        userID: jwt_decode(localStorage.getItem("token"), { body: true })["username"], // doesnt work, need to discuss
        bookListingId: this.props.bookListingId,
        transactionStatus: this.props.paymentStatus,
        paymentId: this.props.paymentId
    }
    //use axios to invoke the api
    console.log(bookToBePurchased);
    axios.post(transactionMicroServiceApi + '/transactions/add' , bookToBePurchased).then(response => {
        this.setState({transactionID: response.data.transactionsId})
        console.log(response.data.transactionsId);
        console.log(this.state.transactionID);
        axios.put(bookMicroServiceApi + '/booklisting/purchased/' + this.props.bookListingId);
    }).then(() => {
        //redirect user to view a receipt of their tranascations
        window.location.href='/transaction/receipt/' + this.state.transactionID
    });
    
  }

   
    render() {
        //when user havent completed their paypal payment yet
        if(!this.props.paymentSuccessful){

            return <h2 class="message">Please confirm your payment details by paypal before you can finish your transaction!</h2>
        }
        return (
            <div>
                 {/* when a user successfully completes their payment details */}
                 <div className="message">
                    <h2>Transaction by PayPal was successful! Please enter your details below!</h2>
                 </div>

                {/*user details form */}
                <div className="container">
                    <form onSubmit= {this.onSubmit}>
                        {/* user details row */}
                            <div className="row">
                                <div className= "col-md-6 form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="First Name"
                                        name="userFirstName" 
                                        onChange={this.onChange}
                                        value={this.state.userFirstName}
                                        required/>
                                </div>
                                <div className="col-md-6 form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Last Name"
                                        name="userLastName" 
                                        onChange={this.onChange} 
                                        value={this.state.userLastName}
                                        required/>
                                </div>
                            </div>
                            {/* address row */}
                            <div className="row" >
                                <div className="form-group col-8">
                                    <input  
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Delivery Address" 
                                        name="userAddress"
                                        onChange={this.onChange}
                                        value={this.state.userAddress}
                                        required/>
                                </div>  
                            </div>
                            <button className="btn btn-info btn-block mt-4" disabled={!this.props.paymentSuccessful}>Purchase</button>
                    </form>                
                </div>
            </div>    
            )
        };
    }

    export default TransactionsBook;