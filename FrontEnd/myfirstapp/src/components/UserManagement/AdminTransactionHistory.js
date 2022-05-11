import axios from 'axios';
import React, { Component } from 'react';
import { transactionMicroServiceApi } from '../../Utilities/hosts';

//admin page to view all transactions and activties on the website
class AdminTransactionHistory extends Component {

    constructor() {
        super();
        this.state = {
            keyword: undefined,
            startDate: "2000-01-01",
            endDate: "3000-12-31",
            transactions: undefined,
            loading: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.filter = this.filter.bind(this);
    }
    //fetch transactions
    onSubmit(e) {
        e.preventDefault();

        axios.get(transactionMicroServiceApi + '/transactions/all').then(response => {
            //save response in a state
            this.setState({ transactions: response.data });
        });
    }
    //detect date choices
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    //filter through transactions
    filter() {
        let tempTransactionArray = [];
        this.state.transactions.forEach(transaction => {

            const creationDate = new Date(transaction.created_At).valueOf();
            const filterStartDate = new Date(this.state.startDate).valueOf();
            const filterEndDate = new Date(this.state.endDate).valueOf();
            // Filter by date range
            if (creationDate >= filterStartDate && creationDate <= filterEndDate) {

                // Filter by keyword
                if (this.state.keyword) {
                    if (transaction['transactionsId'].toString().includes(this.state.keyword)
                        || transaction['bookListingId'].toString().includes(this.state.keyword)
                        || transaction['userFirstName'].toString().includes(this.state.keyword)
                        || transaction['userLastName'].toString().includes(this.state.keyword)
                        || transaction['userAddress'].toString().includes(this.state.keyword)
                        || transaction['transactionStatus'].toString().includes(this.state.keyword)) {

                        tempTransactionArray.push(transaction);
                    }

                } else {
                    tempTransactionArray.push(transaction);
                }

            }
        });
        return tempTransactionArray;
    }

    render() {

        let transactionBlocks;
        if (this.state.transactions) {
            transactionBlocks = this.filter().map((transaction, index) =>
                <div>
                    <div class="row">
                        <div class="col-md-2 m-auto">{transaction.bookListingId}</div>
                        <div class="col-md-2 m-auto">{transaction.userID}</div>
                        <div class="col-md-2 m-auto">{transaction.userFirstName}</div>
                        <div class="col-md-2 m-auto">{transaction.userLastName}</div>
                        <div class="col-md-2 m-auto">{transaction.userAddress}</div>
                        <div class="col-md-2 m-auto">{transaction.transactionStatus}</div>
                    </div>
                    <hr />
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h3 className="text-center mt-4 mb-4">Sitewide Transaction History</h3>
                        <div className="col-md-8 form-group">
                            <form onSubmit={this.onSubmit}>
                                <label htmlFor="searchKeyword">Search for a keyword</label>
                                <input
                                    type="text"
                                    name="keyword"
                                    className="form-control form-control-lg"
                                    onChange={this.onChange}
                                    value={this.keyword}
                                />
                                <label className="mt-1">Change date range</label><br />
                                <input type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={this.startDate}
                                    onChange={this.onChange}
                                    min="2000-01-01"
                                    max="3000-12-31" />

                                <input type="date"
                                    className="ml-2"
                                    id="endDate"
                                    name="endDate"
                                    value={this.endDate}
                                    onChange={this.onChange}
                                    min="2000-01-01"
                                    max="3000-
                                    12-31" />

                                <input type="submit" className="ml-2 pl-1 pr-1" />
                            </form>
                        </div>
                        <div class="col form-group">
                            <div class="row">
                                <div class="col-md-2 m-auto"><b>Book Listing ID</b></div>
                                <div class="col-md-2 m-auto"><b>Purchaser ID</b></div>
                                <div class="col-md-2 m-auto"><b>First Name</b></div>
                                <div class="col-md-2 m-auto"><b>Last Name</b></div>
                                <div class="col-md-2 m-auto"><b>Address</b></div>
                                <div class="col-md-2 m-auto"><b>Status</b></div>
                            </div>
                            <hr style={{ height: "1.25px", background: "darkgray" }} />
                            {transactionBlocks}
                        </div>

                    </div>
                </div>

            </div >
        )
    }

}

export default AdminTransactionHistory;