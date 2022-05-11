package com.rmit.sept.bk.transactionsmicroservice.model;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Table(name="transactions")
@Entity
public class Transactions {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "transactions_id", nullable = false)
        private Long transactionsId;

        // information about a single transactions'
        @NotNull
        private String bookListingId;
        @NotNull
        private String userID;
        @NotNull
        private String userFirstName;
        @NotNull
        private String userLastName;
        @NotNull
        private String userAddress;

        @NotNull
        private String transactionStatus;

        @NotNull
        private String paymentId;

        private Date created_At;
        private Date updated_At;


        //Default Constructor
        public Transactions(){

        }

        //constructor for testing
        public Transactions(Long transactionsId, String bookListingId, String userID, String userFirstName) {
                this.transactionsId = transactionsId;
                this.bookListingId = bookListingId;
                this.userID = userID;
                this.userFirstName = userFirstName;
        }

        //getter and setter methods for the transactionsID
        public Long getTransactionsId() {
                return transactionsId;
        }

        public void setTransactionsId(Long transactionsId) {
                this.transactionsId = transactionsId;
        }

        public String getBookListingId() {
                return bookListingId;
        }

        public void setBookListingId(String bookListingId) {
                this.bookListingId = bookListingId;
        }

        public String getUserID() {
                return userID;
        }

        public void setUserID(String userID) {
                this.userID = userID;
        }

        public String getUserFirstName() {
                return userFirstName;
        }

        public void setUserFirstName(String userFirstName) {
                this.userFirstName = userFirstName;
        }

        public String getUserLastName() {
                return userLastName;
        }

        public void setUserLastName(String userLastName) {
                this.userLastName = userLastName;
        }

        public String getUserAddress() {
                return userAddress;
        }

        public void setUserAddress(String userAddress) {
                this.userAddress = userAddress;
        }

        public String getTransactionStatus() {
                return transactionStatus;
        }

        public void setTransactionStatus(String transactionStatus) {
                this.transactionStatus = transactionStatus;
        }

        public String getPaymentId() {
                return paymentId;
        }

        public void setPaymentId(String paymentId) {
                this.paymentId = paymentId;
        }

        public Date getCreated_At() {
                return created_At;
        }

        public void setCreated_At(Date created_At) {
                this.created_At = created_At;
        }

        public Date getUpdated_At() {
                return updated_At;
        }

        public void setUpdated_At(Date updated_At) {
                this.updated_At = updated_At;
        }

        /**
         * On creation is sets the current data time date
         */
        @PrePersist
        protected void onCreate(){
                this.created_At = this.created_At = new Date();
        }
        /**
         * On update is sets the current date time value
         */
        @PreUpdate
        protected  void onUpdate(){
                this.updated_At = this.updated_At = new Date();
        }
}
