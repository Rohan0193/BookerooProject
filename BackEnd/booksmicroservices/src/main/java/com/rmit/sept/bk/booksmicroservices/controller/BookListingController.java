package com.rmit.sept.bk.booksmicroservices.controller;

import com.rmit.sept.bk.booksmicroservices.model.BookListing;
import com.rmit.sept.bk.booksmicroservices.service.BookListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

//Book Listing microservice controller 
// contains all necessary functions to interact UI actions with this api
@RestController
@RequestMapping("/booklisting")
@CrossOrigin("*")
public class BookListingController {

    @Autowired
    private BookListingService bookListingService;

    // Returns the database response to find all books listings
    @GetMapping
    public ResponseEntity<Collection<BookListing>> findAll() {
        return new ResponseEntity(bookListingService.findAllBookListings(), HttpStatus.OK );
    }

    // Returns the database response to find a book listing by listing id
    @GetMapping(path = "id/{id}")
    public ResponseEntity<BookListing> findbyId(@PathVariable("id") Long id) {
        return new ResponseEntity(bookListingService.findBookListingById(id),HttpStatus.OK);
    }

    // Returns the database response to find a book listing by isbn
    @GetMapping(path = "isbn/{iSBN}")
    public ResponseEntity<Collection<BookListing>> findAllByIsbn(@PathVariable("iSBN") String iSBN) {
        return new ResponseEntity(bookListingService.findBookListingsByISBN(iSBN),HttpStatus.OK);
    }

    // Sends the Json value for the book listing service to process and add to the database
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookListing> save(@RequestBody BookListing bookListing) {
        return new ResponseEntity(bookListingService.addBookListing(bookListing),HttpStatus.CREATED);
    }

    // Updates the book listing with a matching id
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookListing> update(@RequestBody BookListing bookListing) {
        return new ResponseEntity(bookListingService.updateBookListing(bookListing),HttpStatus.OK);
    }

    @PutMapping(path = "purchased/{id}")
    public ResponseEntity<BookListing> purchased(@PathVariable("id") Long id) {
        return new ResponseEntity(bookListingService.updateStatusToPurchased(id),HttpStatus.OK);
    }

    // Returns the database response to find a book listing by isbn
    @GetMapping(path = "isbn/open/{iSBN}")
    public ResponseEntity<Collection<BookListing>> findBookListingsByISBNThatAreOpen(@PathVariable("iSBN") String iSBN) {
        return new ResponseEntity(bookListingService.findBookListingsByISBNThatAreOpen(iSBN),HttpStatus.OK);
    }

    // deletes the book listing with a matching id
    @DeleteMapping(path = "{id}")
    @Transactional
    public ResponseEntity<?> deleteByID(@PathVariable("id") Long id) {
        bookListingService.deleteBookListing(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
