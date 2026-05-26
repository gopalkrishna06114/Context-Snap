package com.contextsnap.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "downloads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Download {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String browser;

    private String version;

    private LocalDateTime downloadedAt;

    @PrePersist
    protected void onCreate() {
        downloadedAt = LocalDateTime.now();
    }
}