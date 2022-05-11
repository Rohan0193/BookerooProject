package com.rmit.sept.bk.booksmicroservices.repositories;

import com.rmit.sept.bk.booksmicroservices.model.BookReview;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface BookReviewRepository extends CrudRepository<BookReview, Long>{
    Collection<BookReview> findAllByIsbn(String isbn);

    void deleteBookReviewByReviewId(Long reviewId);
}
