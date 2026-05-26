package com.contextsnap.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String adminEmail;

    // notify admin when user submits a query
    public void sendQueryNotificationToAdmin(String userName, String userEmail,
                                             String subject, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(adminEmail);
        mail.setSubject("ContextSnap | New Query: " + subject);
        mail.setText(
                "You have a new query from a user!\n\n" +
                        "Name: " + userName + "\n" +
                        "Email: " + userEmail + "\n" +
                        "Subject: " + subject + "\n\n" +
                        "Message:\n" + message + "\n\n" +
                        "Login to your admin dashboard to reply:\n" +
                        "http://localhost:5173/admin"
        );
        mailSender.send(mail);
    }

    // send reply to user when admin replies
    public void sendReplyToUser(String userEmail, String userName,
                                String subject, String reply) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(userEmail);
        mail.setSubject("ContextSnap | Reply to your query: " + subject);
        mail.setText(
                "Hi " + userName + ",\n\n" +
                        "We have replied to your query.\n\n" +
                        "Your Query: " + subject + "\n\n" +
                        "Our Reply:\n" + reply + "\n\n" +
                        "Thank you for using ContextSnap!\n\n" +
                        "Best regards,\n" +
                        "ContextSnap Team"
        );
        mailSender.send(mail);
    }

    // admin sends custom mail to user
    public void sendCustomMailToUser(String userEmail, String userName,
                                     String subject, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(userEmail);
        mail.setSubject("ContextSnap | " + subject);
        mail.setText(
                "Hi " + userName + ",\n\n" +
                        message + "\n\n" +
                        "Best regards,\n" +
                        "ContextSnap Team"
        );
        mailSender.send(mail);
    }
}