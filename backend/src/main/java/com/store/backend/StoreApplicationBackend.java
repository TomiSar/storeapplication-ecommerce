package com.store.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class StoreApplicationBackend {

	public static void main(String[] args) {
		SpringApplication.run(StoreApplicationBackend.class, args);
	}

}
