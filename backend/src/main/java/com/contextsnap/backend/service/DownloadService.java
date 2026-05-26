package com.contextsnap.backend.service;

import com.contextsnap.backend.entity.Download;
import com.contextsnap.backend.entity.User;
import com.contextsnap.backend.repository.DownloadRepository;
import com.contextsnap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DownloadService {

    private final DownloadRepository downloadRepository;
    private final UserRepository userRepository;

    public Download trackDownload(String email, String browser, String version) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // update user download flag
        user.setHasDownloaded(true);
        user.setBrowserUsed(browser);
        userRepository.save(user);

        Download download = Download.builder()
                .user(user)
                .browser(browser)
                .version(version)
                .build();

        return downloadRepository.save(download);
    }

    public List<Download> getUserDownloads(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return downloadRepository.findByUserId(user.getId());
    }

    public long getTotalDownloads() {
        return downloadRepository.count();
    }
}