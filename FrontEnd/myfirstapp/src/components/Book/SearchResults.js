import React, { Component } from "react";
import axios from 'axios';
import { bookMicroServiceApi } from "../../Utilities/hosts";

//class compoenent to display search results
class SearchResult extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true, 
            books: undefined
        };
    }
    //fetch books by ISBN
    componentDidMount() {
        //use axios to invoke api
        axios.get( bookMicroServiceApi+ "/books/search/" + this.props.match.params.id).then(response => {
            this.setState({books: response.data});
            this.setState({isLoading: false});
        });
        
    }

    render() {
        const {isLoading, books} = this.state;

        if(isLoading) {
            return <div className="App">Loading...</div>;
        }
        //check if there are results of a given book
        if(books.length === 0){
            return <div className="App">No results were found</div>;
        }

        return (
            <div>
                <ul className="card-grid">
                {/*loop through the list array created by the hook state to display info*/}
                {books.map((books) => (
                    <li>
                        <a href={`/book/${books.isbn}`}>
                            <article className="card cards-search-results" key={books.callingCodes}>
                                <div className="card-image bookImg">
                                    <img src={`http://covers.openlibrary.org/b/isbn/${books.isbn}-M.jpg`} alt={books.name} />
                                </div>
                                <div className="card-content">
                                    <h2 className="card-name">{books.name}</h2>
                                    <ol className="card-list">
                                        <li>
                                            Book ISBN:{" "}
                                            <span>{books.isbn}</span>
                                        </li>
                                        <li>
                                            Book Title: <span>{books.title}</span>
                                        </li>
                                        <li>
                                            Book Author: <span>{books.authorName}</span>
                                        </li>
                                    </ol>
                                </div>
                            </article>
                        </a>
                    </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default SearchResult;