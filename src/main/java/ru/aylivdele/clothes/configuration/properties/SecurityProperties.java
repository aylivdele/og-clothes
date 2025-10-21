package ru.aylivdele.clothes.configuration.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security")
@Data
public class SecurityProperties {
    private String masterUsername;
    private String masterPassword;
}
