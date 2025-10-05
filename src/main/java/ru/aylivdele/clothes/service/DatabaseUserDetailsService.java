package ru.aylivdele.clothes.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.aylivdele.clothes.configuration.properties.SecurityProperties;
import ru.aylivdele.clothes.entity.User;
import ru.aylivdele.clothes.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DatabaseUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final SecurityProperties securityProperties;
    private final PasswordEncoder passwordEncoder;

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.equals(securityProperties.getMasterUsername())) {
            return new org.springframework.security.core.userdetails.User(
                    securityProperties.getMasterUsername(),
                    passwordEncoder.encode(securityProperties.getMasterPassword()),
                    List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
        }

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}
