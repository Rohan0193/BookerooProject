import axios from 'axios';
import React, { Component } from 'react'
import {bookMicroServiceApi, openlibraryApi} from '../../Utilities/hosts'
import jwt_decode from "jwt-decode";

//class component for creating listing
class CreateListing extends Component {
    constructor(props){
        super(props);
        // Variables for create listing object
        this.state = {

          inOpenBookAPI: false,
          errors: undefined,

          // Information about the book
          isbn: "",
          title: "",
          authorName: "",
          genre: "",
        
          // Information about the listing
          listerId: "",
          condition: "used",
          listingPrice: ""
        };
        //bind methods used by the class component
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkOpenAPI = this.checkOpenAPI.bind(this);
    }
    // method to check if the ISBN entered by a user is a valid ISBN, reject otherwise
    checkOpenAPI(e) {
        e.preventDefault();
        if(this.state.isbn.length < 10){
            this.setState({errors: "Please enter a valid ISBN"});
        } else {
            axios.get(openlibraryApi+ this.state.isbn +'&jscmd=data&format=json')
            .then((res)=> {
                if(Object.keys(res.data).length){
                    this.setState({inOpenBookAPI: true});
                    this.setState({title: res.data['ISBN:'+ this.state.isbn].title});
                    
                    for(let i in res.data['ISBN:'+ this.state.isbn].authors){
                        if ( i > 0){
                            this.setState({authorName: this.state.authorName.concat(' / ')});
                        }
                        this.setState({authorName: this.state.authorName.concat(res.data['ISBN:'+ this.state.isbn].authors[i].name)});
                    }

                    
                    for(let i in res.data['ISBN:'+ this.state.isbn].subjects){
                        if ( i > 0){
                            this.setState({genre: this.state.genre.concat(' / ')});
                        }
                        this.setState({genre: this.state.genre.concat(res.data['ISBN:'+ this.state.isbn].subjects[i].name)});
                    }
                    console.log(res.data['ISBN:'+ this.state.isbn].subjects.length)
                    
                    console.log(this.state.genre);

                    console.log(res.data);
                } else {
                    this.setState({errors: "Unable to find a book with that ISBN"});
    
                }
            })
            .catch(function(error) {
                console.error(error);
            });
        }
    }
    
    //detect change
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    // execute when user submit
    onSubmit(e) {
        e.preventDefault();
        //to push into book table
        const book = {
            isbn: this.state.isbn,
            title: this.state.title,
            authorName: this.state.authorName,
            genre: this.state.genre
        };
        //to push into book listing table
        const newListing = {
            isbn: this.state.isbn,
            listerId: jwt_decode(localStorage.getItem("token"), {body: true})["username"],
            condition: this.state.condition,
            listingPrice: this.state.listingPrice
        }

        // Create book in the database
        axios.post(bookMicroServiceApi +'/books', book).then(()=>(
        // Send create listing to the backend to handle addition in the database
        //when data is pushed db, let it wait before re-directing - lag time between firing up the onSubmit and data reaching db
        axios.post(bookMicroServiceApi +'/booklisting', newListing).then( () => {
            window.location.href='/';
            })
        ));
    }

    render() {
        //check if book is present in the open book api
        if(this.state.inOpenBookAPI){
            return(
                <div>
                    <div className="container">
                        <div className="text-center">
                            <h2>Create a new book listing!</h2>
                        </div>
                    <div>
                        <form onSubmit= {this.onSubmit}>
                        <div className="form-group">
                            <label>ISBN</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="ISBN"
                                name="isbn"
                                value={this.state.isbn}
                                readOnly
                            />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="title"
                                    name="title"
                                    value={this.state.title}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Author"
                                    name="authorName"
                                    value={this.state.authorName}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Genre</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Genre"
                                    name="genre"
                                    value={this.state.genre}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Listing Condition</label>
                                <select name="condition" className="form-control" id="condition" onChange={this.onChange} required>
                                    <option value="used">Used</option>
                                    <option value="new">New</option>
                                </select>
                            </div>
                            <div className="form-group">
                            <label>Listing Price</label>
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    placeholder="Listing Price"
                                    name="listingPrice"
                                    onChange={this.onChange}
                                    value={this.state.listingPrice}
                                    required
                                />
                                </div>
                                <button className="btn btn-info btn-block mt-4">Create Book Listing</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else {
            let errorMessage;
            if(this.state.errors){
                errorMessage = <p style={{color: 'red'}}>{this.state.errors}</p>
            }
            return (
                <div>
                    <div className="container listingForm">
                    <h2 className="text-center">Create a new book listing!</h2>
                        <div className="row">
                        <form onSubmit= {this.checkOpenAPI} class="inputBar">
                            <div className="form-group text-center">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="ISBN"
                                        name="isbn"
                                        value={this.state.isbn}
                                        onChange={this.onChange}
                                        required
                                    />
                            </div>
                                {errorMessage}
                            <button className="btn btn-info btn-block">Enter ISBN</button>
                          </form>
                        </div>
                    </div>
                </div>
                )
            }
        }   
}
export default CreateListing;