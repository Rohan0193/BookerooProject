import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { userMicroServiceApi } from '../../Utilities/hosts';
import { withRouter } from "react-router-dom";
import CountryOptions from '../UserManagement/CountryOptions';

class UserAccountDetails extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true, 
            userDetails: undefined,
            accountId: "",
            accountType: "",
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
            contactNum: "",
            businessNumber: "",
            create_At: "",
        };

        this.getUserFromApi = this.getUserFromApi.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //fetch books by ISBN
    componentDidMount() {
        //use axios to invoke api
       this.getUserFromApi().then(response => {
            //save response in a state
            this.setState({userDetails: response.data});
            this.setState({accountType: response.data.accountType});
            this.setState({username: response.data.username});
            this.setState({firstName: response.data.firstName});
            this.setState({lastName: response.data.lastName});
            this.setState({email: response.data.email});
            this.setState({password: response.data.password});
            this.setState({confirmPassword: response.data.confirmPassword});
            this.setState({address: response.data.address});
            this.setState({city: response.data.city});
            this.setState({state: response.data.state});
            this.setState({postcode: response.data.postcode});
            this.setState({country: response.data.country});
            this.setState({contactNum: response.data.contactNum});
            if (response.data.businessNumber != null){
                this.setState({businessNumber: response.data.businessNumber});
            }
            this.setState({create_At: response.data.create_At});
            this.setState({isLoading : false});

            console.log.apply(response.data);
        });
    }

    getUserFromApi() {
      const token = localStorage.getItem("token");
      const username = jwt_decode(token)["username"];
      let apiUrl = userMicroServiceApi.concat("/api/users/" , username);
      const response = axios.get(apiUrl);
      return response;
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value });
        console.log(this.state.businessNumber);
    }
    
    onSubmit(e) {
        e.preventDefault();
        const newUserDetails = {
        accountType: this.state.accountType,
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        postcode: this.state.postcode,
        country: this.state.country,
        contactNum: this.state.contactNum,
        businessNumber: this.state.businessNumber,
        create_At: this.state.create_At
        };
        console.log(newUserDetails);
        axios.put(userMicroServiceApi+"/api/users/updateUser/"+ this.state.userDetails.id, newUserDetails);
        // this.props.history.push("/userprofile")
        setTimeout(() => this.props.history.push("/userprofile"), 500);
    }

    render() {
        const {isLoading} = this.state;

        if(isLoading) {
            return <div className="App">Loading...</div>;
        }

        let businessNumberField;
        if(this.state.accountType === "shopOwner" || this.state.accountType === "publisher"){
            businessNumberField =
            <div className="col">
                <label>Business Number:</label>
                <input type="text" class="form-control" name="businessNumber" onChange={this.onChange} defaultValue={this.state.businessNumber} required></input>
            </div>
        }

        return (
            <div className="container">
            <div className="row">
                <div className="col-10 mx-auto text-center my-5">
                    <h1>Edit Account Details</h1>
                </div>
            </div> 
            <form onSubmit = {this.onSubmit}>
                <div className="row my-2">
                    <div className="col">
                        <label>First Name:</label>
                        <input type="text" class="form-control" name="firstName" onChange={this.onChange} defaultValue={this.state.firstName}></input>
                    </div>
                    <div className="col">
                        <label>Last Name:</label>
                        <input type="text" class="form-control" name="lastName" onChange={this.onChange} defaultValue={this.state.lastName} required></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Email Address:</label>
                        <input type="email" class="form-control" name="email" onChange={this.onChange} defaultValue={this.state.email} required></input>
                    </div>
                    <div className="col">
                        <label>Contact Number:</label>
                        <input type="tel" class="form-control" name="contactNum" onChange={this.onChange} defaultValue={this.state.contactNum} required></input>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <label>Country:</label>
                        <select name="country" className="form-control" id="country" onChange={this.onChange} defaultValue={this.state.country} required>
                            <CountryOptions />
                        </select>
                    </div>
                    <div className="col">
                        <label>City:</label>
                        <input name="city" type="text" class="form-control" onChange={this.onChange} defaultValue={this.state.city} required></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Address:</label>
                        <input name="address" type="text" class="form-control" onChange={this.onChange} defaultValue={this.state.address} required></input>
                    </div>
                    <div className="col">
                        <label>State:</label>
                        <input name="state" type="text" class="form-control" onChange={this.onChange} defaultValue={this.state.state} required></input>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <label>Post Code:</label>
                        <input name="postcode" type="text" class="form-control" onChange={this.onChange} defaultValue={this.state.postcode} required></input>
                    </div>
                    {businessNumberField}
                </div>
                <div class="text-center my-5">
                    <button class="btn btn-primary">
                        Apply Changes
                    </button>
                </div>
            </form>
        </div>
        )
    }
}
export default withRouter(UserAccountDetails);