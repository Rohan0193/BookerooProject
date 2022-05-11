package com.rmit.sept.bk.booksmicroservices.controller;

import com.rmit.sept.bk.booksmicroservices.model.BookReview;
import com.rmit.sept.bk.booksmicroservices.service.BookReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Collection;

@RestController
@RequestMapping("/bookreview")
@CrossOrigin("*")
public class BookReviewController {

    @Autowired
    private BookReviewService bookReviewService;

    // Returns the database response to find all the book reviews from the database
    @GetMapping(path="{isbn}")
    public ResponseEntity<Collection<BookReview>> findbyIsbn(@PathVariable("isbn") String isbn) {
        return new ResponseEntity(bookReviewService.findAllReviewsByIsbn(isbn), HttpStatus.OK);
    }

    // Updates the book listing with a matching id
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookReview> update(@RequestBody BookReview bookReview) {
        return new ResponseEntity(bookReviewService.updateBookReview(bookReview),HttpStatus.OK);
    }

    // deletes the book listing with a matching id
    @DeleteMapping(path = "/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteByID(@PathVariable("id") Long id) {
        bookReviewService.deleteBookReview(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    // post a new book review to db
    @PostMapping(path = "/addreview")
    public ResponseEntity<?> createNewBookReview(@RequestBody BookReview bookReview){
        return new ResponseEntity<>(bookReviewService.addBookReview(bookReview), HttpStatus.CREATED);
    }

}
