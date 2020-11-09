package com.example.khorunzhevprojects.expensetracker.repository;

import com.example.khorunzhevprojects.expensetracker.model.Expense;
import com.example.khorunzhevprojects.expensetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}
