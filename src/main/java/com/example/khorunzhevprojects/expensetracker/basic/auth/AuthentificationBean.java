package com.example.khorunzhevprojects.expensetracker.basic.auth;

import lombok.Data;

@Data
public class AuthentificationBean {

    private String message;

    public AuthentificationBean(String message) {
        this.message = message;
    }
}
