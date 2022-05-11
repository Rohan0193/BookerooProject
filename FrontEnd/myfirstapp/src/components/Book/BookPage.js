import React, { Component } from 'react';
import axios from 'axios';
import {bookMicroServiceApi} from "../../Utilities/hosts";
import BookReviews from "./BookReviews";
import jwt_decode from "jwt-decode";
import { FaStar } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai"


//class component to show book details
class BookPage extends Component {
 
    constructor() {
        super();
        this.state = {
            isLoading: true, 
            book: undefined,
            listings: [],
            reviews: [],
            isbnBookForSale: '',

        };
        //method to get book info from api
        this.getBookFromApi = this.getBookFromApi.bind(this);
        this.deleteReview  = this.deleteReview.bind(this);
    }

     //fetch books from api
     getBookFromApi(isbn) {
      let apiUrl = bookMicroServiceApi.concat("/books/" , isbn);
      const bookApiResponse = axios.get(apiUrl);
      return bookApiResponse;
    }
    //fetch books by ISBN
    componentDidMount() {
        //use axios to invoke api
       this.getBookFromApi(this.props.match.params.id).then(response => {
            //save response in a state
            this.setState({book: response.data});
            this.setState({isLoading : false});
            if(this.state.book){
              console.log(this.state.book);
            }
            //get listings of a book
        }).then(
          axios.get(bookMicroServiceApi.concat("/booklisting/isbn/open/" , this.props.match.params.id))
          .then(response => {
            this.setState({listings: response.data});
          })
        ).catch(
          function (error) {
            console.log('An error occurred with the response from the API.', + error);
          }
        );
        //get book reviews
        axios.get(bookMicroServiceApi.concat("/bookreview/", this.props.match.params.id))
        .then(response => {
          this.setState({reviews: response.data});
          console.log(response.data)
        })
    }
    //detect change
    onChange(e) {
      this.setState({[e.target.name]: e.target.value });
  }
  //submit form
  onSubmit(e) {
      e.preventDefault();
      const newReviewDetails = {
      accountType: this.state.accountType,
      isbn: this.state.book.isbn,

      };
      //push review to db
      axios.post(bookMicroServiceApi+"/bookreview/addreview/"+ newReviewDetails);
  }

  //delete a review
  deleteReview(reviewId) {
    axios.delete(bookMicroServiceApi + "/bookreview/delete/" + reviewId);
    window.location.reload();
  }
   
    //render the books on the page
    render() {

        //use hooks to transfer state 
        const {isLoading, book} = this.state;

        if(isLoading) {
            return <div className="App">Loading...</div>;
        }
        
        //check if listings are present
        let bListings;
        if(this.state.listings.length === 0){

          bListings = <h4>No listings found.</h4>
          
         }
        else{
            //binds the book's review & listing
            bListings = this.state.listings.map((aBookListing) =>
            <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Seller Username : {aBookListing.listerId} </h5>
                  <p class="card-text">Condition: {aBookListing.condition}</p>
                  <p class="card-text">Price: {aBookListing.listingPrice}</p>
                  <a href={`/bookeroo-pay/book-listing/${aBookListing.listingId}`}> <i class="fas fa-shopping-cart"></i> </a>
                </div>
            </div>
           );
        }
        //check if a book has reviews
        let bReviews;
        if(this.state.reviews.length === 0){

          bReviews = <h4>No Book Reviews found.</h4>
          
         }
        else{
            //binds the book's review & listing
            bReviews = this.state.reviews.map((aBookReview) => {
              let reviewDeleteBtn;
              if (localStorage.getItem("token")) {  
                if (aBookReview.reviewerId === jwt_decode(localStorage.getItem("token"))["username"]) {
                reviewDeleteBtn =
                <button class="btn btn-danger btn-sm float-right"><AiFillDelete size={20} onClick={this.deleteReview.bind(this, aBookReview.id)}/></button>
                }
              }
              return (
              <div class="card">
                <div class="card-body">
                  {reviewDeleteBtn}
                  <h5 class="card-title">Reviewer: {aBookReview.reviewerId} </h5>
                  <p>{[...Array(aBookReview.rating)].map(star => {
                    return <FaStar className="star" color="#ffc107" size={20}></FaStar>
                  })} </p>
                  <p class="card-text">{aBookReview.statements}</p>
                </div>
            </div>
              )
            }
           );
        }

        //create a book review
        let bookReviewForm;
        if(localStorage.getItem("token")){
          const user = jwt_decode(localStorage.getItem("token"))["username"];
          bookReviewForm =
          <BookReviews isbnNum={book.isbn} username={user}/>
        }
        //show message if user not logged in
        else {
          bookReviewForm =
          <div>
            <h4>Please log in to place a review</h4>
          </div>
        }
        //show book details
        return (
          <div className="container page py-5">
            {/* book title */}
            <div className="row">
              <div className="col-10 mx-auto text-center">
                <h1>{book.title}</h1>
              </div>
            </div>
            {/* image */}
            <div className="row">
              <div className="mx-auto text-center col-md-6 my-5">
                <img src={book.mediumCover}
                  className="bookImage" alt="book" />
              </div>
              {/* Book Information */}
              <div className="mx-auto col-md-6 my-5">
                <div class="row">
                  <h2 className="my-4"> Author: {book.authorName}</h2>
                </div>
                <div class="row">
                  <h2 className="my-4"> ISBN: {book.isbn}</h2>
                </div>
                <div class="row">
                  <h2 className="my-4"> Category:</h2>
                </div>
                <div class="row">
                  <div class="genreBox">{book.genre}</div>
                </div>
              </div>
            </div>
            {/* reviews  & listing*/}
            <div className="RevList">
              <div className="row">
                <div className="col-md-6">
                  <h4>Reviews</h4>
                  {bookReviewForm}
                  {bReviews}
                </div>
                <div className="col-md-6">
                  <h4>Listing</h4>
                  {bListings}
                </div>
              </div>
            </div>
          </div>
        );
      }
      }

export default BookPage;
