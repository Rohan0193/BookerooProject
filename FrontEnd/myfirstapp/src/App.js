import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import BookPage from "./components/Book/BookPage"
import UserProfile from "./components/UserManagement/UserProfile";
import BookerooPay from "./components/Transaction/BookerooPay";
import PrivateRoute from "./securityUtils/PrivateRoute";
import AdminRoute from "./securityUtils/AdminRoute";
import PageNotFound from "./components/Error Pages/PageNotFound";
import AdminOnlyErrorPage from "./components/Error Pages/AdminOnlyErrorPage";
import AdminManagement from "./components/UserManagement/AdminManagement";
import UserAccountDetails from "./components/UserManagement/UserAccountDetails"
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import AboutPage from "./components/About/AboutPage";
import Footer from "./components/Layout/Footer";
import ApprovalPage from "./components/UserManagement/ApprovalPage";
import CreateListing from "./components/Book/CreateListing";
import Receipt from "./components/Transaction/Receipt";
import SearchResults from "./components/Book/SearchResults";
import AdminTransactionHistory from "./components/UserManagement/AdminTransactionHistory"
import UserTransactionHistory from "./components/UserManagement/UserTransactionHistory";


//save jwtToken in local storage
const jwtToken = localStorage.jwtToken;

//set token
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
            {
              //Public Routes
              //For every page you create, you should include a route
              //the name you specify in the "exact path" will be used to route a button when pressed
            }

            {/* Public Routes */}
            {/* main application routes */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/book/:id" component={BookPage} />
            <Route exact path="/search/:id" component={SearchResults}/> 

            {/* Private Routes */}
            {/* user profile pages */}
            <PrivateRoute exact path="/edituserdetails" component={UserAccountDetails} />
            <PrivateRoute exact path="/userprofile" component={UserProfile} />
            <PrivateRoute exact path="/user/transactionhistory" component={UserTransactionHistory}/>

            {/* book listing page */}
            <PrivateRoute exact path="/listing" component={CreateListing} />

            {/* Admin Routes */}
            <AdminRoute exact path="/adminmanagement" component={AdminManagement} />
            <AdminRoute exact path="/approvalpage" component={ApprovalPage}/>
            <AdminRoute exact path="/admin/transactionhistory" component={AdminTransactionHistory}/>
            
            {/* Transactions */}
            <PrivateRoute exact path="/bookeroo-pay/book-listing/:id" component={BookerooPay} userToken={jwtToken}/>
            <PrivateRoute exact path="/transaction/receipt/:id" component={Receipt} />

            {/* Error Pages */}
            <Route exact path="/401" component={AdminOnlyErrorPage}/>
            <Route component={PageNotFound}/>
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;