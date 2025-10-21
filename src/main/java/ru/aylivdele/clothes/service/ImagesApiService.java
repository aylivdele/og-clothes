package ru.aylivdele.clothes.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.aylivdele.clothes.api.ImagesApiDelegate;
import ru.aylivdele.clothes.model.CreateImageRequest;
import ru.aylivdele.clothes.model.Image;
import ru.aylivdele.clothes.repository.ImageRepository;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ImagesApiService implements ImagesApiDelegate {
    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<Void> createImage(CreateImageRequest createImageRequest) {
        var newImage = modelMapper.map(createImageRequest, ru.aylivdele.clothes.entity.Image.class);
        imageRepository.save(newImage);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Void> deleteImage(Long imageId) {
        imageRepository.deleteById(imageId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Image> getImage(Long imageId) {
        try {
            return ResponseEntity.ok(modelMapper.map(imageRepository.findById(imageId).orElseThrow(), Image.class));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Resource> getImageData(Long imageId) {
        try {
            return ResponseEntity.ok(new ByteArrayResource(imageRepository.findById(imageId).orElseThrow().getData()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Void> updateImage(Image image) {
        try {
            var existingImage = imageRepository.findById(image.getId()).orElseThrow();
            existingImage.setPosition(image.getPosition());
            imageRepository.save(existingImage);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
