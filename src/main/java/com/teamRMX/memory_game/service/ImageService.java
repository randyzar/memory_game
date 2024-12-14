package com.teamRMX.memory_game.service;

import com.teamRMX.memory_game.model.Image;
import com.teamRMX.memory_game.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }


    // Obtener todas las imágenes
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Image addImage(Image image) {
        return imageRepository.save(image);
    }

    // Obtener una imagen por ID
    public Image getImageById(Long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found with ID: " + id));
    }

    // Actualizar una imagen
    public Image updateImage(Long id, Image updatedImage) {
        Image existingImage = getImageById(id);
        existingImage.setImageName(updatedImage.getImageName());
        existingImage.setImageUrl(updatedImage.getImageUrl());
        existingImage.setIsActive(updatedImage.getIsActive());
        return imageRepository.save(existingImage);
    }

    // Eliminar una imagen
    public void deleteImage(Long id) {
        Image image = getImageById(id);
        imageRepository.delete(image);
    }
}
