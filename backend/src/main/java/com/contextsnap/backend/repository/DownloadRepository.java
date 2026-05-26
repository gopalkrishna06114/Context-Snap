package com.contextsnap.backend.repository;

import com.contextsnap.backend.entity.Download;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DownloadRepository extends JpaRepository<Download, Long> {
    List<Download> findByUserId(Long userId);
    long countByUserId(Long userId);

    @Transactional
    void deleteByUserId(Long userId);
}