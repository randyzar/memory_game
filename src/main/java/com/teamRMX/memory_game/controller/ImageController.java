package com.teamRMX.memory_game.controller;
import com.teamRMX.memory_game.model.Image;
import com.teamRMX.memory_game.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<?> addImage(@RequestBody Image image) {
        if (image.getImageName() == null || image.getImageUrl() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre y la URL son obligatorios.");
        }
        return ResponseEntity.ok(imageService.addImage(image));
    }


    //OBTENER TODAS LAS IMAGENES
    @GetMapping
    public ResponseEntity<List<Image>> getAllImages() {
        return ResponseEntity.ok(imageService.getAllImages());
    }

    // Obtener una imagen por ID
    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable Long id) {
        return ResponseEntity.ok(imageService.getImageById(id));
    }

    // Actualizar una imagen
    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable Long id, @RequestBody Image image) {
        return ResponseEntity.ok(imageService.updateImage(id, image));
    }

    // Eliminar una imagen
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }
}
