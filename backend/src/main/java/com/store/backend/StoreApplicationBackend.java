package com.store.backend;

import com.store.backend.dto.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.*;
import org.springframework.cache.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableCaching
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
@EnableConfigurationProperties(value = {ContactInfoDto.class})
public class StoreApplicationBackend {

	public static void main(String[] args) {
		SpringApplication.run(StoreApplicationBackend.class, args);
	}

}
