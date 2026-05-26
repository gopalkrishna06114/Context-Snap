package com.contextsnap.backend.repository;

import com.contextsnap.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByIsReadFalseOrderByCreatedAtDesc();
    long countByIsReadFalse();

    @Transactional
    void deleteByRelatedUserId(Long relatedUserId);
}