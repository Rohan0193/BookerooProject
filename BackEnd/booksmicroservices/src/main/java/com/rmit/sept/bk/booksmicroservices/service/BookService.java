package com.rmit.sept.bk.booksmicroservices.service;

import com.rmit.sept.bk.booksmicroservices.model.Book;
import com.rmit.sept.bk.booksmicroservices.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

//service class to implement BookRepository methods to send data to database
@Service
public class BookService {

    //create a repository object
    @Autowired
    public BookRepository bookRepository;

    //implement add book method to add new books to database
    public Book addBook(Book book) {
        Book insertedBook;
        try {
            insertedBook = bookRepository.save(book);
        } catch (Exception e){
            throw new RuntimeException(String.format(
                    "Something went wrong when attempting to insert book into the database - %s",
                    e.toString()
            ));
        }
        return insertedBook;
    }

    //function to find all books in database
    public Collection<Book> findAllBooks(){
        Collection<Book> allBooks;
        try {
            allBooks = (Collection<Book>) bookRepository.findAll();
        } catch (Exception e){
            throw new RuntimeException(String.format(
                    "Something went wrong - %s",
                    e.toString()
            ));
        }
        return allBooks;
    }

    //find book by isbn
    public Book findBooksByISBN(String isbn){
        Book aBook;
        try {
            aBook = bookRepository.findByIsbn(isbn);
        } catch (Exception e) {
            throw new RuntimeException(String.format(
                    "Something went wrong when attempting to find book with an ISBN of %s - %s",
                    isbn, e.toString()
            ));
        }
        return aBook;
    }

    //delete books by isbn
    public void deleteBook(String isbn){
        try {
            bookRepository.deleteBookByIsbn(isbn);
        } catch (Exception e){
            throw new RuntimeException(String.format(
                    "Something went wrong when attempting to delete book with an ISBN of %s - %s",
                    isbn, e.toString()
            ));
        }
    }

    //update book
    public Book updateBook(Book book){
        Book updatedBook;
        try {
            updatedBook = bookRepository.save(book);
        } catch (Exception e) {
            throw new RuntimeException(String.format(
                    "Something went wrong when attempting to update book with an ISBN of %s - %s",
                    book.getIsbn(), e.toString()
            ));
        }

        return updatedBook;
    }

    // finds all books containing a the value passed in the title, author name or isbn.
    public Collection<Book> findAllByString(String value){
        Collection<Book> filteredBookList;

        try {
            filteredBookList =  bookRepository.findAllByTitleIgnoreCaseContainingOrAuthorNameIgnoreCaseContainingOrIsbnIgnoreCaseContaining(value, value, value);
        } catch (Exception e) {
            throw new RuntimeException(String.format(
                    "Something went wrong when attempting to get all books with containing the string %s - %s",
                    value, e.toString()
            ));
        }
        return filteredBookList;
    }
}
