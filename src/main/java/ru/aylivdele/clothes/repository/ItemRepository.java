package ru.aylivdele.clothes.repository;

import org.springframework.data.repository.CrudRepository;
import ru.aylivdele.clothes.entity.Image;
import ru.aylivdele.clothes.entity.Item;

public interface ItemRepository extends CrudRepository<Item, Long> {
}
