import React, { Component } from 'react'

// a small component to show admin specific actiosn when logged in
export default class ProfileDropDown extends Component {
    render() {
        
        return (
            <div>
                <a href="/userprofile">Profile</a>
                <a href="/edituserdetails">Edit Account Details</a>
                <a href="/approvalpage">User Approval</a>
                <a href="/admin/transactionhistory">Site Transaction History</a>
                <a href="/adminmanagement">Admin Management</a>
            </div>
        )
    }
}
