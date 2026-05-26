package com.contextsnap.backend.service;

import com.contextsnap.backend.entity.User;
import com.contextsnap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String email, Map<String, String> updates) {
        User user = getByEmail(email);

        if (updates.containsKey("name") && !updates.get("name").isBlank())
            user.setName(updates.get("name"));

        if (updates.containsKey("location"))
            user.setLocation(updates.get("location"));

        if (updates.containsKey("password") && !updates.get("password").isBlank())
            user.setPassword(passwordEncoder.encode(updates.get("password")));

        return userRepository.save(user);
    }
}