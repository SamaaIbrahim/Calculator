package com.example.demo.service;
import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public ResponseEntity<String> calculateExpression(String expression) {
        if (expression == null || expression.isEmpty()) {
            return ResponseEntity.badRequest().body("Expression is required");
        }

        try {
            double result = evaluateExpression(expression);
            return ResponseEntity.ok(String.valueOf(result));
        } catch (Exception e) {
            System.err.println("Error evaluating expression: " + e.getMessage());
            return ResponseEntity.badRequest().body("Invalid expression: " + e.getMessage());
        }
    }

    private double evaluateExpression(String expression) {
        Expression exp = new ExpressionBuilder(expression)
                .build();
        return exp.evaluate();
    }
}
