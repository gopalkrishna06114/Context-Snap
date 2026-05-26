package com.contextsnap.backend.controller;

import com.contextsnap.backend.entity.*;
import com.contextsnap.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final DownloadService downloadService;
    private final QueryService queryService;

    // get profile
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication auth) {
        return ResponseEntity.ok(userService.getByEmail(auth.getName()));
    }

    // update profile
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            Authentication auth,
            @RequestBody Map<String, String> updates) {
        return ResponseEntity.ok(userService.updateProfile(auth.getName(), updates));
    }

    // track download
    @PostMapping("/download")
    public ResponseEntity<Download> trackDownload(
            Authentication auth,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(downloadService.trackDownload(
                auth.getName(),
                body.get("browser"),
                body.getOrDefault("version", "1.0.0")
        ));
    }

    // get my downloads
    @GetMapping("/downloads")
    public ResponseEntity<List<Download>> getMyDownloads(Authentication auth) {
        return ResponseEntity.ok(downloadService.getUserDownloads(auth.getName()));
    }

    // submit query
    @PostMapping("/query")
    public ResponseEntity<QueryMessage> submitQuery(
            Authentication auth,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(queryService.submitQuery(
                auth.getName(),
                body.get("subject"),
                body.get("message")
        ));
    }

    // get my queries
    @GetMapping("/queries")
    public ResponseEntity<List<QueryMessage>> getMyQueries(Authentication auth) {
        return ResponseEntity.ok(queryService.getUserQueries(auth.getName()));
    }
}