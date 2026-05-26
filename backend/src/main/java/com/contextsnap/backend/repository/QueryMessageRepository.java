package com.contextsnap.backend.repository;

import com.contextsnap.backend.entity.QueryMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QueryMessageRepository extends JpaRepository<QueryMessage, Long> {
    List<QueryMessage> findByUserId(Long userId);
    List<QueryMessage> findByStatus(QueryMessage.Status status);

    @Transactional
    void deleteByUserId(Long userId);
}