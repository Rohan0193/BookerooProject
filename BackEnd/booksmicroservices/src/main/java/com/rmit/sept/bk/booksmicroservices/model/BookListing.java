package com.rmit.sept.bk.booksmicroservices.model;

import javax.persistence.*;
import java.util.Date;

@Table(name = "bookListing")
@Entity
public class BookListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long listingId;
    private String isbn;
    private String listerId;
    private String condition;
    private String status = "open";
    private float listingPrice;
    private Date create_At;
    private Date update_At;

    /**
     * Default Constructor
     */
    public BookListing(){

    }

    //constructor for testing
    public BookListing(Long listingId, String isbn, String listerId, String condition, String status, float listingPrice) {
        this.listingId = listingId;
        this.isbn = isbn;
        this.listerId = listerId;
        this.condition = condition;
        this.status = status;
        this.listingPrice = listingPrice;
    }

    /**
     * @return unique ID for the listing
     */
    public Long getListingId() {
        return listingId;
    }

    /**
     * Sets the listing id
     * @param listingId
     */
    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    /**
     * @return the isbn of the book that is listed
     */
    public String getIsbn() {
        return isbn;
    }

    /**
     * Sets the book's ISBN
     * @param isbn
     */
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }


    /**
     * @return an ID for the user who created the listing
     */
    public String getListerId() {
        return listerId;
    }

    /**
     * Sets the lister ID
     * @param listerId
     */
    public void setListerId(String listerId) {
        this.listerId = listerId;
    }

    /**
     * @return the condition of the book
     */
    public String getCondition() {
        return condition;
    }

    /**
     * Sets the book condition
     * @param condition
     */
    public void setCondition(String condition) {
        this.condition = condition;
    }


    /**
     * @return floating number for the price of the book in dollars($)
     */
    public float getListingPrice() {
        return listingPrice;
    }

    /**
     * Sets the listing price of the book
     * @param listingPrice
     */
    public void setListingPrice(float listingPrice) {
        this.listingPrice = listingPrice;
    }

    /**
     * @return the create at date value
     */
    public Date getCreate_At() {
        return create_At;
    }

    /**
     * Sets the create_at date value
     * @param create_At
     */
    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    /**
     * @return the updated_at value
     */
    public Date getUpdate_At() {
        return update_At;
    }

    /**
     * Sets the update_at value
     * @param update_At
     */
    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    /**
     * @return the status of the book listing
     */
    public String getStatus() {
        return status;
    }

    /**
     *
     * @param status
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * On creation is sets the current data time date
     */
    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    /**
     * On updae is sets the current date time value
     */
    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}
