package ru.aylivdele.clothes.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import ru.aylivdele.clothes.api.CategoriesApiDelegate;
import ru.aylivdele.clothes.model.Category;
import ru.aylivdele.clothes.repository.CategoryRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CategoryApiService implements CategoriesApiDelegate {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public ResponseEntity<Category> createCategory(Category category) {
        var newCategory = modelMapper.map(category, ru.aylivdele.clothes.entity.Category.class);
        categoryRepository.save(newCategory);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Void> deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(
                StreamSupport.stream(categoryRepository.findAll().spliterator(), false)
                        .map(i -> modelMapper.map(i, Category.class)).toList()
        );
    }

    @Override
    public ResponseEntity<Category> getCategory(Long categoryId) {
        try {
            return ResponseEntity.ok(modelMapper.map(
                    categoryRepository.findById(categoryId).orElseThrow(() -> new NotFoundException(String.valueOf(categoryId))),
                    Category.class
            ));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Category> updateCategory(Long categoryId, Category category) {
        var newCategory = modelMapper.map(category, ru.aylivdele.clothes.entity.Category.class);
        categoryRepository.save(newCategory);
        return ResponseEntity.noContent().build();
    }
}
