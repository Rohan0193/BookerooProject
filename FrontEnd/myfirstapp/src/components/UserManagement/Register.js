import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import CountryOptions from "../UserManagement/CountryOptions";
import SimpleReactValidator from 'simple-react-validator';

//register class
class Register extends Component {
  constructor(props) {
    super(props);
    //elements to collect from user to register
    this.state = {
      accountType: "basic",
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      state: "",
      postcode: "",
      country: "Afghanistan",
      contactNum: "",
      businessNumber: "",
      errors: {}
    };
    //set state for 2 functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //form validator
    this.validator = new SimpleReactValidator();
  }

  // execute when user submit
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      accountType: this.state.accountType,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      postcode: this.state.postcode,
      country: this.state.country,
      contactNum: this.state.contactNum,
      businessNumber: this.state.businessNumber

    };
    //form validator
    if(this.validator.allValid()){
      this.props.createNewUser(newUser, this.props.history);
      alert("You have successfully created an account!")
    }
    else{
      this.validator.showMessages();
      this.forceUpdate();
    }
    
  }

  //detect change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.country)
  }

  render() {
    const { errors } = this.state.errors;

    let businessNumField;
    if (this.state.accountType === "shopOwner" || this.state.accountType === "publisher") {
      businessNumField =
        <div id="businessNumField" className="form-group">
          <label htmlFor="Business Number">Business Number</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Business Number"
            name="businessNumber"
            value={this.state.businessNumber}
            onChange={this.onChange}
            required
          />
          {this.validator.message('businessNumber', this.state.businessNumber, 'required|phone')}
        </div>
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3 className="text-center mt-4">Create your account</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="error-message">{errors}</div>
                  <label htmlFor="accountType">Account Type</label>
                  <select name="accountType" id="accountType" className="form-control" onChange={this.onChange} required>
                    <option value="basic">Basic User</option>
                    <option value="shopOwner">Shop Owner</option>
                    <option value="publisher">Publisher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="First Name"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('firstName', this.state.firstName, 'required|alpha|string')}
                  </div>
                  <div className="col form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Last Name"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      required
                    />
                     {this.validator.message('lastName', this.state.lastName, 'required|alpha|string')}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                  {this.validator.message('email', this.state.email, 'required|email' , {className:'text-danger'} )}
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('username', this.state.username, 'required|min:7')}
                  </div>
                  <div className="col form-group">
                    <label htmlFor="Contact Number">Contact Number</label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      placeholder="Contact Number"
                      name="contactNum"
                      value={this.state.contactNum}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('contactNum', this.state.contactNum, 'required|contactNum|numeric|min:10,num', { className: 'text-danger'} )}
                  </div>
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('password', this.state.password, 'required|password|min:7', { className: 'text-danger'} )}
                  </div>
                  <div className="col form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('confirmPassword', this.state.confirmPassword, 'required|confirmPassword|min:7', { className: 'text-danger'})}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="Address">Address</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                    required
                  />
                   {this.validator.message('address', this.state.address, 'required|address|min:5')}
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label htmlFor="City">City</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="City"
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('city', this.state.city, 'required|city')}
                  </div>
                  <div className="col form-group">
                    <label htmlFor="State">State</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="State"
                      name="state"
                      value={this.state.state}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('state', this.state.state, 'required|state')}
                  </div>
                  <div className="col form-group">
                    <label htmlFor="postcode">Postcode</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Postcode"
                      name="postcode"
                      value={this.state.postcode}
                      onChange={this.onChange}
                      required
                    />
                    {this.validator.message('postcode', this.state.postcode, 'required|postcode|numeric|min:4', {className: 'text-danger'})}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select name="country" className="form-control" id="country" onChange={this.onChange} required>
                    <CountryOptions />
                  </select>
                </div>

                {businessNumField}

                <button type="submit" className="btn btn-info btn-block mt-4">Create your account</button>
              </form>
              <div align="center" className="mt-4">
                <i>Already have an account?</i><br />
                <a style={{ color: "#006060" }} align="center" href="/login"><i>Proceed to login</i></a>
              </div>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);