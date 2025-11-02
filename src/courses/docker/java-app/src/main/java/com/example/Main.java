
package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Docker! This is a simple Java application.");

        String dbHost = System.getenv("DB_HOST");
        String dbName = System.getenv("DB_NAME");
        String dbUser = System.getenv("DB_USER");
        String dbPassword = System.getenv("DB_PASSWORD");

        if (dbHost != null && dbName != null && dbUser != null && dbPassword != null) {
            String url = "jdbc:postgresql://" + dbHost + "/" + dbName;
            try {
                System.out.println("Connecting to database...");
                Connection connection = DriverManager.getConnection(url, dbUser, dbPassword);
                System.out.println("Connection to PostgreSQL successful!");
                connection.close();
            } catch (SQLException e) {
                System.err.println("Failed to connect to PostgreSQL: " + e.getMessage());
            }
        } else {
            System.out.println("Database environment variables not set, skipping database connection.");
        }
    }
}
