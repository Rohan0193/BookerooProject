package com.rmit.sept.bk.booksmicroservices.service;
import com.rmit.sept.bk.booksmicroservices.model.Book;
import com.rmit.sept.bk.booksmicroservices.model.BookListing;
import com.rmit.sept.bk.booksmicroservices.repositories.BookListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

@Service
public class BookListingService {

    //create a repository object
    @Autowired
    public BookListingRepository bookListingRepository;

    //implement add booklisting method to add new book listings to database
    public BookListing addBookListing(BookListing bookListing) {
        BookListing insertedBookListing = null;
        try {
            bookListing.setStatus("open");
            insertedBookListing = bookListingRepository.save(bookListing);

        } catch (Exception e){
            throw new RuntimeException("Something went wrong when attempting to insert book listing into the database");
        }

        return insertedBookListing;
    }

    //function to find all book listings in the database
    public Collection<BookListing> findAllBookListings(){
        Collection<BookListing> allBookListings = null;
        try {
            allBookListings = (Collection<BookListing>) bookListingRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong when attempting to retrieve all book listings from the database");
        }

        return allBookListings;
    }

    //find book listing by id
    public BookListing findBookListingById(Long id){
        BookListing aBookListing = null;
        try {
            aBookListing = bookListingRepository.getByListingId(id);
        } catch (Exception e) {
            throw new RuntimeException(
                    String.format(
                            "Something went wrong when attempting find a book listing from the database with an id: %d",
                            id)
            );
        }
        return aBookListing;
    }

    //find book listing by isbn
    public Collection<BookListing> findBookListingsByISBN(String isbn){
        Collection<BookListing> bookListings = null;
        try {
            bookListings = bookListingRepository.findAllByIsbn(isbn);
        } catch (Exception e) {
            String.format(
                    "Something went wrong when attempting find book listings from the database with an isbn of: %s",
                    isbn
            );
        }
        return bookListings;
    }

    //delete book listing by id
    public void deleteBookListing(Long id){
        try {
            bookListingRepository.deleteBookListingByListingId(id);
        } catch (Exception e) {
            String.format(
                    "Something went wrong when attempting delete a book listings from the database with an id of: %d - %s",
                    id, e.toString()
            );
        }
    }

    //update book
    public BookListing updateBookListing(BookListing booklisting){
        BookListing updatedBookListing = null;
        try {
            updatedBookListing = bookListingRepository.save(booklisting);
        } catch (Exception e) {
            String.format(
                    "Something went wrong when attempting update a book listing from the database with an id of: %d - %s",
                    booklisting.getListingId(), e.toString()
            );
        }
        return updatedBookListing;
    }

    // change the status to purchased
    public BookListing updateStatusToPurchased(Long id){

        BookListing updatedBookListing = null;
        try {
            BookListing aBookListing = null;
            aBookListing = bookListingRepository.getByListingId(id);
            aBookListing.setStatus("purchased");
            updatedBookListing = updateBookListing(aBookListing);
        } catch (Exception e) {
            String.format(
                    "Failed to update book listing with an id: %d, status failed - %s",
                    id, e.toString()
            );
        }
        return updatedBookListing;
    }

    // Finds all open book listings with the isbn parameter passed
    public Collection<BookListing> findBookListingsByISBNThatAreOpen(String isbn){

        Collection<BookListing> openListings= new ArrayList<>();
        try {
            Collection<BookListing> listings= bookListingRepository.findAllByIsbn(isbn);
            Iterator<BookListing> iterator= listings.iterator();

            while (iterator.hasNext()) {
                BookListing listing= iterator.next();
                if (listing.getStatus().equals("open")) {
                    openListings.add(listing);
                }
            }
        } catch (Exception e){
            String.format(
                    "Something went wrong when finding book listings that are open - %s", e.toString()
            );
        }

        return openListings;
    }

}
