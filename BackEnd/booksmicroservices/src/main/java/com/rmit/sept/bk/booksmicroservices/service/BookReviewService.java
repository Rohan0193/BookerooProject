package com.rmit.sept.bk.booksmicroservices.service;

import com.rmit.sept.bk.booksmicroservices.model.Book;
import com.rmit.sept.bk.booksmicroservices.model.BookReview;
import com.rmit.sept.bk.booksmicroservices.repositories.BookReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class BookReviewService {

    @Autowired
    public BookReviewRepository bookReviewRepository;

    /**
     * Adds the book in the database through the book review repository
     * @param bookReview
     * @return inserted book review
     */
    public BookReview addBookReview(BookReview bookReview) {
        BookReview insertedBookReview = null;
        try {
            insertedBookReview = bookReviewRepository.save(bookReview);
        } catch (Exception e){
            throw new RuntimeException("Something went wrong when attempting to insert book review into the database");
        }

        return insertedBookReview;
    }

    /**
     * Deletes the book review from the database
     * @param reviewId
     */
    public void deleteBookReview(Long reviewId){
        try {
            bookReviewRepository.deleteBookReviewByReviewId(reviewId);
        } catch (Exception e) {
            throw new RuntimeException(
                    String.format("Something went wrong when attempting to delete book review with a review id %d",
                            reviewId)
            );
        }

    }

    /**
     * Updates the book in the database
     * @param bookReview
     * @return
     */
    public BookReview updateBookReview(BookReview bookReview){
        BookReview updatedBookReview = null;
        try {
            updatedBookReview =  bookReviewRepository.save(bookReview);
        } catch (Exception e) {
            String.format("Something went wrong when attempting to update book review with a review id %d",
                    bookReview.getId());
        }

        return updatedBookReview;
    }

    /**
     *
     * @param isbn
     * @return
     */
    public Collection<BookReview> findAllReviewsByIsbn(String isbn){
        Collection<BookReview> bookReviews = null;

        try {
            bookReviews = bookReviewRepository.findAllByIsbn(isbn);
        } catch (Exception e) {
            String.format("Something went wrong when attempting to find all book reviews with an isbn of %s",
                    isbn);
        }
        return bookReviews;
    }

}
