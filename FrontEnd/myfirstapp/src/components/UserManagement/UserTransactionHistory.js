import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import { transactionMicroServiceApi } from '../../Utilities/hosts';

// a components to show user transaction history
class UserTransactionHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            transactions: undefined,
            loading: true
        };
    }
    //fetch user's transactions when launching the componenent
    componentDidMount(){
        const username = jwt_decode(localStorage.getItem("token"), {body: true})["username"];
        axios.get(transactionMicroServiceApi +'/transactions/user/' + username).then(response => {
            console.log(response.data);
            let tempTransactionArray = [];
            response.data.forEach(transaction => {
                tempTransactionArray.push(transaction);
            });
            this.setState({transactions: tempTransactionArray});
            this.setState({loading: false});
        });
    }

    render() {

        if (this.state.loading){
            return <p>Loading...</p>
        }

        let transactionBlocks;
        if (this.state.transactions) {
            transactionBlocks = this.state.transactions.map((transaction) =>
                <div>
                    <div class="row">
                        <div class="col-md-1 m-auto">{transaction.transactionsId}</div>
                        <div class="col-md-1 m-auto">{transaction.bookListingId}</div>
                        <div class="col-md-1 m-auto">{transaction.userAddress}</div>
                        <div class="col-md-1 m-auto">
                            <a href={`/transaction/receipt/${transaction.transactionsId}`} >Receipt</a>
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <h3 className="text-center mt-4 mb-4">Transaction History</h3>
                        <div class="col form-group">
                            <div class="row">
                                <div class="col-md-1 m-auto"><b >Transaction ID</b></div>
                                <div class="col-md-1 m-auto"><b>Book Listing ID</b></div>
                                <div class="col-md-1 m-auto"><b>Delivery Address</b></div>
                                <div class="col-md-1 m-auto"><b>Receipt</b></div>
                            </div>
                        </div>
                        <hr style={{ height: "1.25px", background: "darkgray" }} />
                        {transactionBlocks}
                    </div>
                </div>
            </div>
        )
    }

}

export default UserTransactionHistory;