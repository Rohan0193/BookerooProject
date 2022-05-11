package com.rmit.sept.bk.transactionsmicroservice.Service;

import com.rmit.sept.bk.transactionsmicroservice.model.Transactions;
import com.rmit.sept.bk.transactionsmicroservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;

// a service class to implement the repository methods
@Service
public class TransactionsService {

    @Autowired
    public TransactionRepository transactionRepository;

    @Autowired
    public TransactionsService transactionsService;

    //create a transaction record in database
    public Transactions addTransaction(Transactions transaction){
        Transactions newTransaction=null;
        try{
            newTransaction = transactionRepository.save(transaction);
        }
        catch(Exception e){
            throw new RuntimeException("Transaction Invalid", e);
        }
        return newTransaction;
    }

    //get all transaction records
    public Collection<Transactions> getAllTransactions(){
        Collection<Transactions>  allTransactions= null;
        try{
            allTransactions = (Collection<Transactions>) transactionRepository.findAll();
        }
        catch(Exception e){
            throw new RuntimeException("There are not transactions available to see");
        };

        return allTransactions;
    }

    //get transactions by transaction id
    public Optional<Transactions> getTransactionsByTransactionId(Long id){
        Optional<Transactions> transactionsById= null;

        try{
            transactionsById = transactionRepository.findById(id);
        }
        catch (Exception e){
            throw new RuntimeException("No record with that ID");
        }
        return transactionsById;
    }

    //delete a transaction
    public void deleteTransactionByID(Long id){
        try{
            transactionRepository.deleteById(id);
        }
        catch (Exception e){
            throw new RuntimeException("Transaction cannot be deleted",e);
        }
    }

    //get transactions by user id
    public Collection<Transactions> getTransactionByUserId(String userID){
        Collection<Transactions> allTransactionsByUserId= null;
        try{
            allTransactionsByUserId = transactionRepository.findAllByUserID(userID);
        }
        catch(Exception e){
            throw new RuntimeException("Transactions not found",e);
        }
        return allTransactionsByUserId;
    }

    //update transaction by transaction id
    public void updateTransactionById(Long id, Transactions transaction){
        try{
            Optional<Transactions> getTransactionById = transactionsService.getTransactionsByTransactionId(id);
            String status =  transaction.getTransactionStatus();
            Transactions dbTransaction = getTransactionById.get();
            dbTransaction.setTransactionStatus(status);
            transactionsService.addTransaction(dbTransaction);
        }
        catch (Exception e){
            throw new RuntimeException("Transaction cannot be updated");
        }
    }


}
