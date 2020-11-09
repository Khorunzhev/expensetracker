package com.example.khorunzhevprojects.expensetracker.controller;

import com.example.khorunzhevprojects.expensetracker.model.Expense;
import com.example.khorunzhevprojects.expensetracker.model.User;
import com.example.khorunzhevprojects.expensetracker.repository.ExpenseRepository;
import com.example.khorunzhevprojects.expensetracker.repository.ExpenseRepository;
import com.example.khorunzhevprojects.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/expenses")
    Collection<Expense> getExpenses(@RequestHeader("Authorization-UserName") String userName) {
        User user = userRepository.findByLogin(userName);
        return  expenseRepository.findAllByUser(user);
    }

    @GetMapping("/expense/{id}")
    ResponseEntity<Expense> getExpense(@PathVariable Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/expense")
    ResponseEntity<Expense> createExpense(@RequestHeader("Authorization-UserName") String userName, @Valid @RequestBody Expense expense) throws URISyntaxException {
        User user = userRepository.findByLogin(userName);
        expense.setUser(user);

        Expense result = expenseRepository.save(expense);
        return ResponseEntity.created(new URI(String.format("api/expense/%d", result.getId()))).body(result);
    }

    @PutMapping("/expense/{id}")
    ResponseEntity<Expense> updateExpense(@Valid @RequestBody Expense expense) {
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/expense/{id}")
    ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
