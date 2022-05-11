package com.rmit.sept.bk.booksmicroservices.repositories;

import com.rmit.sept.bk.booksmicroservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

//repository class that implements CrudRepository methods to connect to database
@Repository
public interface BookRepository extends CrudRepository<Book, String> {

    Book findByIsbn(String isbn);

    void deleteBookByIsbn(String isbn);

    Collection<Book> findAllByTitleIgnoreCaseContainingOrAuthorNameIgnoreCaseContainingOrIsbnIgnoreCaseContaining(String title, String name, String isbn);
}
