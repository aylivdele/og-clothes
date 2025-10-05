package ru.aylivdele.clothes.repository;

import org.springframework.data.repository.CrudRepository;
import ru.aylivdele.clothes.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
