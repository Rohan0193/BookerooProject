package com.rmit.sept.bk.transactionsmicroservice.repository;

import com.rmit.sept.bk.transactionsmicroservice.model.Transactions;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;

//transaction interface to extend CRUD repo for database
@Repository
public interface TransactionRepository extends CrudRepository<Transactions, Long> {
    Collection<Transactions> findAllByUserID(String userID);
}
