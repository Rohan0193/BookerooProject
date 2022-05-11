import React, { Component } from 'react'

//Search bar compoment
 class SearchBar extends Component {

    //a constructor to create the state
    constructor(){
        super();
        this.state = {
            search : ""
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

        //handles state change
        onChange(e){
            this.setState({[e.target.name]: e.target.value});
        }
        //excutes when user clicks submit
        onSubmit(e){
            e.preventDefault();
            window.location.href=`/search/${this.state.search}`;
        }
        
    render() {
        //customize search bar
        const searchBar = {
            width: '40rem',
            height: '2.5rem'
        };
        return (
            <div>
                <nav class="navbar">
                    <form class="form-inline" onSubmit={this.onSubmit}>
                            <input 
                                type="text" 
                                className="form-control-lg mr-sm-2 search-bar-nav" 
                                placeholder="search all your favourite books here!"
                                value = {this.state.search}
                                name = "search"
                                onChange = {this.onChange}
                                style={searchBar}
                                />
                        <button class="btn btn-primary my-2 my-sm-0 " type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                </nav>
                
            </div>
        )
    }
}

export default SearchBar;