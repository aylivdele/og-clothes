package ru.aylivdele.clothes.configuration;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.aylivdele.clothes.entity.Item;
import ru.aylivdele.clothes.entity.PropertyQuantity;
import ru.aylivdele.clothes.repository.PropertyQuantityRepository;

import java.util.stream.Collectors;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {
    private final EntityManager em;
    private final PropertyQuantityRepository propertyQuantityRepository;

    @Bean
    public ModelMapper modelMapper() {
        var modelMapper = new ModelMapper();



        return modelMapper;
    }
}
