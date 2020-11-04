package com.example.khorunzhevprojects.expensetracker.repository;

import com.example.khorunzhevprojects.expensetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByName(String name);


}
