package ru.aylivdele.clothes.repository;

import org.springframework.data.repository.CrudRepository;
import ru.aylivdele.clothes.entity.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
