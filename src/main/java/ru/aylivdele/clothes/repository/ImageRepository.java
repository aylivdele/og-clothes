package ru.aylivdele.clothes.repository;

import org.springframework.data.repository.CrudRepository;
import ru.aylivdele.clothes.entity.Category;
import ru.aylivdele.clothes.entity.Image;

public interface ImageRepository extends CrudRepository<Image, Long> {
}
