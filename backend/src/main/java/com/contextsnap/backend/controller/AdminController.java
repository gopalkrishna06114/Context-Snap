package com.contextsnap.backend.controller;

import com.contextsnap.backend.entity.*;
import com.contextsnap.backend.repository.*;
import com.contextsnap.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final DownloadRepository downloadRepository;
    private final NotificationRepository notificationRepository;
    private final QueryMessageRepository queryMessageRepository;
    private final QueryService queryService;
    private final UserService userService;
    private final EmailService emailService;

    // dashboard stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalDownloads", downloadRepository.count());
        stats.put("usersDownloaded",
                userRepository.findAll().stream()
                        .filter(User::isHasDownloaded).count());
        stats.put("pendingQueries",
                queryService.getAllQueries().stream()
                        .filter(q -> q.getStatus() == QueryMessage.Status.PENDING).count());
        stats.put("unreadNotifications",
                notificationRepository.countByIsReadFalse());
        return ResponseEntity.ok(stats);
    }

    // get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // delete user — removes related records first to avoid FK constraint errors
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            // delete related downloads
            downloadRepository.deleteByUserId(id);
            // delete related queries
            queryMessageRepository.deleteByUserId(id);
            // delete related notifications
            notificationRepository.deleteByRelatedUserId(id);
            // now safe to delete user
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to delete user: " + e.getMessage());
        }
    }

    // get all queries
    @GetMapping("/queries")
    public ResponseEntity<List<QueryMessage>> getAllQueries() {
        return ResponseEntity.ok(queryService.getAllQueries());
    }

    // reply to query
    @PostMapping("/queries/{id}/reply")
    public ResponseEntity<QueryMessage> replyToQuery(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(queryService.replyToQuery(id, body.get("reply")));
    }

    // get notifications
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications() {
        return ResponseEntity.ok(
                notificationRepository.findByIsReadFalseOrderByCreatedAtDesc());
    }

    // mark notification as read
    @PutMapping("/notifications/{id}/read")
    public ResponseEntity<String> markRead(@PathVariable Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
        return ResponseEntity.ok("Marked as read");
    }

    // get all downloads
    @GetMapping("/downloads")
    public ResponseEntity<List<Download>> getAllDownloads() {
        return ResponseEntity.ok(downloadRepository.findAll());
    }

    // send custom mail to user
    @PostMapping("/users/{id}/mail")
    public ResponseEntity<String> sendMailToUser(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        try {
            emailService.sendCustomMailToUser(
                    user.getEmail(),
                    user.getName(),
                    body.get("subject"),
                    body.get("message")
            );

            Notification notification = Notification.builder()
                    .message("Mail sent to " + user.getName() + ": " + body.get("subject"))
                    .type("MAIL_SENT")
                    .relatedUserId(user.getId())
                    .build();
            notificationRepository.save(notification);

            return ResponseEntity.ok("Mail sent successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to send mail: " + e.getMessage());
        }
    }
}