package ru.aylivdele.clothes.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import ru.aylivdele.clothes.api.ItemsApiDelegate;
import ru.aylivdele.clothes.model.Item;
import ru.aylivdele.clothes.repository.ItemRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class ItemsApiService implements ItemsApiDelegate {
    private final ItemRepository itemRepository;

    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public ResponseEntity<Void> createItem(Item item) {

        /*var images = Optional.ofNullable(item.getImages()).orElse(Collections.emptyList())
                .stream().map(image -> Image.builder().position(image.getPosition()).build()).toList();
        imageRepository.saveAll(images);

        var props = Optional.ofNullable(item.getProperties()).orElse(Collections.emptyMap())
                .entrySet().stream().map(prop -> PropertyQuantity.builder().valueId(Long.valueOf(prop.getKey())).quantity(prop.getValue()).build()).toList();
        propertyQuantityRepository.saveAll(props);

        itemRepository.save(ru.aylivdele.clothes.entity.Item.builder()
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .article(item.getArticle())
                .images(images)
                .category(item.getCategory())
                .properties(props)
                .build());*/
        var newItem = modelMapper.map(item, ru.aylivdele.clothes.entity.Item.class);
        itemRepository.save(newItem);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Void> deleteItem(Long itemId) {
        itemRepository.deleteById(itemId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Override
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(
                StreamSupport.stream(itemRepository.findAll().spliterator(), false)
                        .map(i -> modelMapper.map(i, Item.class)).toList()
        );
    }

    @Override
    public ResponseEntity<Item> getItemById(Long itemId) {
        try {
            return ResponseEntity.ok(modelMapper.map(
                    itemRepository.findById(itemId).orElseThrow(() -> new NotFoundException(String.valueOf(itemId))),
                    Item.class
            ));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Void> updateItem(Item item) {
        var existingItem = itemRepository.findById(item.getId()).orElseThrow(() -> new NotFoundException(String.valueOf(item.getId())));
        modelMapper.map(item, existingItem);
        itemRepository.save(existingItem);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
