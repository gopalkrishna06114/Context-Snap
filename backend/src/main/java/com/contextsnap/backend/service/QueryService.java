package com.contextsnap.backend.service;

import com.contextsnap.backend.entity.*;
import com.contextsnap.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QueryService {

    private final QueryMessageRepository queryMessageRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public QueryMessage submitQuery(String email, String subject, String message) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        QueryMessage query = QueryMessage.builder()
                .user(user)
                .subject(subject)
                .message(message)
                .build();

        QueryMessage saved = queryMessageRepository.save(query);

        // create notification for admin
        Notification notification = Notification.builder()
                .message("New query from " + user.getName() + ": " + subject)
                .type("NEW_QUERY")
                .relatedUserId(user.getId())
                .build();
        notificationRepository.save(notification);

        // send email notification to admin
        try {
            emailService.sendQueryNotificationToAdmin(
                    user.getName(),
                    user.getEmail(),
                    subject,
                    message
            );
        } catch (Exception e) {
            System.out.println("Admin email notification failed: " + e.getMessage());
        }

        return saved;
    }

    public List<QueryMessage> getUserQueries(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return queryMessageRepository.findByUserId(user.getId());
    }

    public List<QueryMessage> getAllQueries() {
        return queryMessageRepository.findAll();
    }

    public QueryMessage replyToQuery(Long queryId, String reply) {
        QueryMessage query = queryMessageRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));

        query.setAdminReply(reply);
        query.setStatus(QueryMessage.Status.REPLIED);
        query.setRepliedAt(LocalDateTime.now());

        QueryMessage saved = queryMessageRepository.save(query);

        // notify admin that reply was sent
        Notification notification = Notification.builder()
                .message("Reply sent to " + query.getUser().getName()
                        + " for query: " + query.getSubject())
                .type("REPLY_SENT")
                .relatedUserId(query.getUser().getId())
                .build();
        notificationRepository.save(notification);

        // send reply email to user
        try {
            emailService.sendReplyToUser(
                    query.getUser().getEmail(),
                    query.getUser().getName(),
                    query.getSubject(),
                    reply
            );
        } catch (Exception e) {
            System.out.println("User reply email failed: " + e.getMessage());
        }

        return saved;
    }
}