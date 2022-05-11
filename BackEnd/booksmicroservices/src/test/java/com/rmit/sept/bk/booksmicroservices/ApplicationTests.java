package com.rmit.sept.bk.booksmicroservices;

import com.rmit.sept.bk.booksmicroservices.controller.BookListingController;
import com.rmit.sept.bk.booksmicroservices.controller.BookReviewController;
import com.rmit.sept.bk.booksmicroservices.controller.BooksController;
import com.rmit.sept.bk.booksmicroservices.model.Book;
import com.rmit.sept.bk.booksmicroservices.model.BookListing;
import com.rmit.sept.bk.booksmicroservices.model.BookReview;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class ApplicationTests {

	//create a book object
	public Book book;
	//create a book listing object
	public BookListing bookListing;
	//create a book review object
	public BookReview bookReview;

	@Autowired
	private BooksController booksController;
	@Autowired
	private BookListingController bookListingController;
	@Autowired
	private BookReviewController bookReviewController;

	//test to check if the controller is not null and is working
	@Test
	void contextLoads() throws Exception{

		assertThat(booksController).isNotNull();
	}

	/**
	 * Book Tests
	 * */
	//this test would pass
	@DisplayName("create a book")
	@Test
	void saveBook() throws Exception{
		//create a book object
		book = new Book("1234","The book","AbdoTech","Tech");
		//invoke the add method
		booksController.save(book);
		//check if the book is added in the database
		Assertions.assertNotNull(booksController.findbyId("1234"));
	}

	@DisplayName("find book by name")
	@Test
	void findBook() throws Exception{
		//create a book object
		book = new Book("1234","The book","AbdoTech","Tech");
		//invoke the add method
		booksController.save(book);
		//null assertion for the inserted book
		Assertions.assertNotNull(booksController.findAllBySearchValue("The book"));

	}
	//delete book and check if it returns 200 ok and empty array to confirm deletion
	@DisplayName("delete book by isbn")
	@Test
	void deleteBook() throws Exception{
		//create a book object
		book = new Book("1234","The book","AbdoTech","Tech");
		//invoke the add method
		booksController.save(book);
		//delete book
		booksController.deleteByID("1234");
		//check if it returns HttpStatus 200 OK
		Assertions.assertEquals(HttpStatus.OK.value(),booksController.findbyId("1234").getStatusCode().value());
	}

	/**
	 * BookListing Tests
	 * */
	@DisplayName("create book listing")
	@Test
	void createBookListing() throws Exception{
		//create a book listing
		bookListing = new BookListing(12345L,"1234","1","new","open",23);
		//invoke the add method
		bookListingController.save(bookListing);
		//check if the book is added in the database
		Assertions.assertNotNull(bookListingController.findbyId(12345L));

	}
	@DisplayName("find booklisting by ISBN")
	@Test
	void findBookByISBN() throws Exception{
		//create a book listing
		bookListing = new BookListing(12345L,"1234","1","new","open",23);
		//invoke the add method
		bookListingController.save(bookListing);
		//check if it returns HttpStatus 200 OK
		Assertions.assertEquals(HttpStatus.OK.value(),bookListingController.findAllByIsbn("1234").getStatusCode().value());

	}

	/**
	 * Book Review Test
	 * */
	@DisplayName("create a book review")
	@Test
	void createBookReview() throws Exception{
		//create a book review
		bookReview = new BookReview(123L,"12345","2",5,"This is very goood");
		//add reviews
		bookReviewController.createNewBookReview(bookReview);
		//check if review is added
		Assertions.assertNotNull(bookReviewController.findbyIsbn("12345"));
	}
	@DisplayName("delete review")
	@Test
	void deleteReviews() throws Exception{
		//create a book review
		bookReview = new BookReview(123L,"12345","2",5,"This is very goood");
		//add reviews
		bookReviewController.createNewBookReview(bookReview);
		//delete book
		bookReviewController.deleteByID(123L);
		//check if return HTTPS ok
		Assertions.assertEquals(HttpStatus.OK.value(), bookReviewController.findbyIsbn("12345").getStatusCode().value());
	}


}
