import React, { Component } from 'react'

//a small component to show user specifc dropw down when logged in
export default class UserProfileDropDown extends Component {
    render() {
        return (
            <div>
                <a href="/userprofile">Profile</a>
                <a href="/listing">Create Listing</a>
                <a href="/edituserdetails">Edit Account Details</a>
            </div>
        )
    }
}
