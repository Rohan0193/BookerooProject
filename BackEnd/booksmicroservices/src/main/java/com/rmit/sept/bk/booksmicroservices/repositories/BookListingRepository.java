package com.rmit.sept.bk.booksmicroservices.repositories;

import com.rmit.sept.bk.booksmicroservices.model.BookListing;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface BookListingRepository extends CrudRepository<BookListing, Long> {
    Collection<BookListing> findAllByIsbn(String isbn);
    BookListing getByListingId(Long id);
    void deleteBookListingByListingId(Long id);
}
