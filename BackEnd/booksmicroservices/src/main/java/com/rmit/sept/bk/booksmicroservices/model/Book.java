package com.rmit.sept.bk.booksmicroservices.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

//specify book table
@Table(name = "books")
@Entity
public class Book {

    //make isbn as primary key
    @Id
    private String isbn;
    private String title;
    @Column(columnDefinition="TEXT")
    private String authorName;
    @Column(columnDefinition="TEXT")
    private String genre;
    private Date create_At;
    private Date update_At;

    /**
     * Default Constructor
     */
    public Book(){

    }

    //constructor for testing
    public Book(String isbn, String title, String authorName, String genre) {
        this.isbn = isbn;
        this.title = title;
        this.authorName = authorName;
        this.genre = genre;
    }

    /**
     * @return the ISBN of the book
     */
    public String getIsbn() {
        return isbn;
    }

    /**
     * @return the title of the book
     */
    public String getTitle() {
        return title;
    }

    /**
     * @return the author's first name that wrote the book
     */
    public String getAuthorName() {
        return authorName;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    /**
     * @return the genre of the book
     */
    public String getGenre() { return genre; }

    /**
     * @return a link to a medium size front cover of the book
     */
    public String getMediumCover() {
        return "http://covers.openlibrary.org/b/isbn/" + this.isbn + "-M.jpg";
    }

    /**
     * @return a link to a large size front cover of the book
     */
    public String getLargeCover() {
        return "http://covers.openlibrary.org/b/isbn/" + this.isbn + "-L.jpg";
    }

    public void setIsbn(String isbnNumber) {this.isbn = isbnNumber;}

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    /**
     * On creation is sets the current data time date
     */
    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    /**
     * On update is sets the current date time value
     */
    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}
