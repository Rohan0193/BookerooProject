package com.rmit.sept.bk.transactionsmicroservice;

import com.rmit.sept.bk.transactionsmicroservice.controller.TransactionsController;
import com.rmit.sept.bk.transactionsmicroservice.model.Transactions;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class TransactionsApplicationTests {

	//create transactions object
	public Transactions transactions;

	//create transactions controller object
	@Autowired
	TransactionsController transactionsController;


	//test to check if the controller is not null and is working
	@Test
	void contextLoads() throws Exception{
		assertThat(transactionsController).isNotNull();
	}

	@DisplayName("create transaction")
	@Test
	void createTransaction() throws Exception{
		//create transaction
		transactions = new Transactions(123L,"1","1234","Test");
		//add transaction
		transactionsController.save(transactions);
		//check if its added
		Assertions.assertNotNull(transactionsController.findAllByTransactionId(123L));
	}

	@DisplayName("find transaction by ID")
	@Test
	void findTransactionByID() throws Exception{
		//create transaction
		transactions = new Transactions(123L,"1","1234","Test");
		//add transaction
		transactionsController.save(transactions);
		//find transaction by id
		Assertions.assertEquals(HttpStatus.OK.value(), transactionsController.findAllByTransactionId(123L).getStatusCode().value());
	}

	@DisplayName("find transaction by User Id")
	@Test
	void findTransactionByUserId() throws Exception{
		//create transaction
		transactions = new Transactions(123L,"1","1234","Test");
		//add transaction
		transactionsController.save(transactions);
		//find transaction by User ID
		Assertions.assertEquals(HttpStatus.OK.value(), transactionsController.findAllByUserId("1234").getStatusCode().value());
	}


}
