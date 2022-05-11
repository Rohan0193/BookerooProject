package com.rmit.sept.bk.booksmicroservices.controller;
import com.rmit.sept.bk.booksmicroservices.model.Book;
import com.rmit.sept.bk.booksmicroservices.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

//Book microservice controller - the brain of the microservice,
// contains all necessary functions to interact UI actions with this api
@RestController
@RequestMapping("/books")
@CrossOrigin("*")
public class BooksController {

    @Autowired
    private BookService booksService;

    //get all books
    @GetMapping
    public ResponseEntity<Collection<Book>> findAll() {
        return new ResponseEntity(booksService.findAllBooks(), HttpStatus.OK );
    }

    //get book by isbn
    @GetMapping(path = "{iSBN}")
    public ResponseEntity<Book> findbyId(@PathVariable("iSBN") String iSBN) {
        return new ResponseEntity(booksService.findBooksByISBN(iSBN),HttpStatus.OK);
    }

    // gets a book by a value
    @GetMapping(path= "search/{value}")
    public ResponseEntity<Collection<Book>> findAllBySearchValue(@PathVariable("value") String value) {
        return new ResponseEntity(booksService.findAllByString(value),HttpStatus.OK);
    }

    //post a book to database
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Book> save(@RequestBody Book book) {
        return new ResponseEntity(booksService.addBook(book),HttpStatus.CREATED);
    }

    //update a book in database
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Book> update(@RequestBody Book book) {
        return new ResponseEntity(booksService.updateBook(book),HttpStatus.OK);
    }

    //delete a specific book from database
    @DeleteMapping(path = "{iSBN}")
    @Transactional
    public ResponseEntity<?> deleteByID(@PathVariable("iSBN") String iSBN) {
        booksService.deleteBook(iSBN);
        return new ResponseEntity(HttpStatus.OK);
    }

}
