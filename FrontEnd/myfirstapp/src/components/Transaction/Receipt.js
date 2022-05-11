import React, { Component } from 'react';
import axios from 'axios';
import { bookMicroServiceApi, transactionMicroServiceApi } from '../../Utilities/hosts';

 //show receipt of a specific transaction 
 class Receipt extends Component {

    constructor(){
      super();
      this.state = {
         transactions : undefined,
         loading : true,
         bookID : undefined,
         bookDetails: "",
         isbn:"",
         bookListingDetails:""
      }
    }

  //get transaction details
  getTransactionDetails(id){
    const transactionDetails = axios.get(transactionMicroServiceApi +'/transactions/' + id);
    return transactionDetails;
  }
  //get book details
  getBookDetails(id){
    const bookDetails = axios.get(bookMicroServiceApi+'/booklisting/id/'+ id);
    return bookDetails;
  }

   //when component is mounted, fetch transaction details  
   componentDidMount(){ 
    this.getTransactionDetails(this.props.match.params.id)
    .then(
      response => {
        //console.log(response.data);
        console.log(response.data.bookListingId);
        //put response in array to set state
        this.setState({transactions: response.data});
        this.setState({bookID : response.data.bookListingId});
        this.setState({loading: false});
      })
      //then book listing details
      .then(()=>{
        this.getBookDetails(this.state.bookID)
          .then(
            response => {
              this.setState({bookListingDetails: response.data})
              this.setState({isbn: response.data.isbn})
            }
          )
          //to get the book details by isbn
          .then(() => {
              axios.get(bookMicroServiceApi+ '/books/' + this.state.isbn)
                .then(
                  response => {
                    console.log(response.data);
                    this.setState({bookDetails: response.data})
                  }
              )
          })
      })
    } 

    render() {
      const {loading,transactions} = this.state;
      const {bookDetails} = this.state;
      const {bookListingDetails} = this.state;
      if(loading) {
        return <div className="App">Loading...</div>;
        }
        return (
            <div className="receipt">

              <div className="receipt-header">
                  <h3>Invoice</h3>
              </div>
    
              <div className="receipt-body" gutter={24} style={{ marginTop: 32 }}>
                <div className="receipt-userDetails">
                  <h3>{transactions.userFirstName} {transactions.userLastName}</h3>
                  <div>{transactions.userAddress}</div>
                </div>
                <div className="receipt-transactionDetails">
                  <table>
                    <tr>
                      <th>Transaction # :</th>
                      <td>{transactions.transactionsId}</td>
                    </tr>
                    <tr>
                      <th>Transaction Date:</th>
                      <td>{transactions.created_At}</td>
                    </tr>
                    <tr>
                      <th>Payment ID:</th>
                      <td>{transactions.paymentId}</td>
                    </tr>
                  </table>
                </div>
              </div>
        
              <table class="invoiceTable">
                  <thead>
                    <tr>
                      <th>ISBN</th>
                      <th>Book Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                
                  <tbody>
                    <tr>
                      <td>{bookDetails.isbn}</td>
                      <td>{bookDetails.title}</td>
                      <td>{bookListingDetails.listingPrice}</td>
                    </tr>
                  </tbody>
              </table>

            </div>
          )
        }
    }

  export default Receipt;