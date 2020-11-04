package com.example.khorunzhevprojects.expensetracker.repository;

import com.example.khorunzhevprojects.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
