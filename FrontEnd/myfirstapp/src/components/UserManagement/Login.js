import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import SimpleReactValidator from 'simple-react-validator';

//login class
class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    //form validator
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //execute this on submit
  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    
    //form validator
    if(this.validator.allValid()){
      this.props.login(user, this.props.history);
    }
    else{
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  //excute when onChange is detected
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3 className="text-center mt-4">Log in</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="username"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={this.username}
                    name="username"
                    required
                    onChange={this.onChange}
                  />
                  {this.validator.message('username', this.state.username, 'required', {className:'text-danger'})}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={this.password}
                    name="password"
                    required
                    onChange={this.onChange}
                  />
                  {this.validator.message('password', this.state.password, 'required|password|min:7', { className: 'text-danger'} )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div align="center" className="mt-4">
                <i>Don't have an account? </i>
                <a style={{ color: "#006060" }} align="center" href="/register"><i>Register now</i></a>
                <p style={{color: 'red'}}>Shop Owners and Publishers accounts will take additional time to be approved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);