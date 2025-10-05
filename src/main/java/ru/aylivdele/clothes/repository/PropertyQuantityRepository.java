package ru.aylivdele.clothes.repository;

import org.springframework.data.repository.CrudRepository;
import ru.aylivdele.clothes.entity.Image;
import ru.aylivdele.clothes.entity.PropertyQuantity;

import java.util.Collection;

public interface PropertyQuantityRepository extends CrudRepository<PropertyQuantity, Long> {
    Collection<PropertyQuantity> findAllByItemId(Long itemId);
}
