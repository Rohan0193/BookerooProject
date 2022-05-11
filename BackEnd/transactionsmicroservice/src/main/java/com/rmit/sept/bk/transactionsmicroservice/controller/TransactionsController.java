package com.rmit.sept.bk.transactionsmicroservice.controller;

import com.rmit.sept.bk.transactionsmicroservice.Service.TransactionsService;
import com.rmit.sept.bk.transactionsmicroservice.model.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

// controller api to invoke the database through the transaction ms
@RestController
@RequestMapping(path= "/transactions")
@CrossOrigin("*")
public class TransactionsController {

    @Autowired
    TransactionsService transactionsService;

    //get all transactions
    @GetMapping("/all")
    public ResponseEntity<Collection<Transactions>>findAll(){
        return new ResponseEntity(transactionsService.getAllTransactions(), HttpStatus.OK);
    }

    //get all transactions by transaction id
    @GetMapping(path="{id}")
    public ResponseEntity<Collection<Transactions>>findAllByTransactionId(@PathVariable("id") Long id ){
        return new ResponseEntity(transactionsService.getTransactionsByTransactionId(id), HttpStatus.OK);
    }

    //get all transaction by user id
    @GetMapping(path="/user/{id}")
    public ResponseEntity<Collection<Transactions>> findAllByUserId(@PathVariable("id") String userID){
        return new ResponseEntity(transactionsService.getTransactionByUserId(userID), HttpStatus.OK);
    }

    //post transactions
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Transactions> save(@RequestBody Transactions transactions){
        return new ResponseEntity(transactionsService.addTransaction(transactions), HttpStatus.CREATED);
    }

    //update status method by transaction id
    @PutMapping(value="/status/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Transactions> update(@RequestBody Transactions transaction, @PathVariable Long id){
        transactionsService.updateTransactionById(id, transaction);
        return new ResponseEntity(HttpStatus.OK);
    }

    //delete transaction by transaction id
    @DeleteMapping(path="/delete/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable("id") Long id){
        transactionsService.deleteTransactionByID(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
