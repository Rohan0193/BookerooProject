package com.rmit.sept.bk.booksmicroservices.model;

import javax.persistence.*;
import java.util.Date;

@Table(name = "bookReview")
@Entity
public class BookReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    private String isbn;
    private String reviewerId;
    private int rating;
    private String statements;
    private Date create_At;
    private Date update_At;

    /**
     * Constructor for a Book Review
     *
     * @param reviewId
     * @param isbn
     * @param reviewerId
     * @param rating
     * @param statements
     * @param create_At
     * @param update_At
     */
    public BookReview(Long reviewId, String isbn, String reviewerId, int rating, String statements,
                        Date create_At, Date update_At){

        this.reviewId = reviewId;
        this.isbn = isbn;
        this.reviewerId = reviewerId;
        this.rating = rating;
        this.statements = statements;
        this.create_At = create_At;
        this.update_At = update_At;

    }
    //default constructor
    public BookReview() {

    }

    //constructor for testing
    public BookReview(Long reviewId, String isbn, String reviewerId, int rating, String statements) {
        this.reviewId = reviewId;
        this.isbn = isbn;
        this.reviewerId = reviewerId;
        this.rating = rating;
        this.statements = statements;
    }

    /**
     * @return the id of the book review
     */
    public Long getId() {
        return reviewId;
    }

    /**
     * Sets the id of the book review
     * @param reviewId
     */
    public void setId(Long reviewId) {
        this.reviewId = reviewId;
    }

    /**
     * @return the isbn of the book
     */
    public String getIsbn() {
        return isbn;
    }

    /**
     * Sets the isbn of the book
     * @param isbn
     */
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    /**
     * @return the reviewer id
     */
    public String getReviewerId() {
        return reviewerId;
    }

    /**
     * Sets the reviewer Id
     * @param reviewerId
     */
    public void setReviewerId(String reviewerId) {
        this.reviewerId = reviewerId;
    }

    /**
     * @return the rating of the review
     */
    public int getRating() {
        return rating;
    }

    /**
     * Sets the rating of the review
     * @param rating
     */
    public void setRating(int rating) {
        this.rating = rating;
    }

    /**
     * @return the statements of the review
     */
    public String getStatements() {
        return statements;
    }

    /**
     * Sets the statement of the review
     * @param statements
     */
    public void setStatements(String statements) {
        this.statements = statements;
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
