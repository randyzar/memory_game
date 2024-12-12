package com.teamRMX.memory_game.repository;

import com.teamRMX.memory_game.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
