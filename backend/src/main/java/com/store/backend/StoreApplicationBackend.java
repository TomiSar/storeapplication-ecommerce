package com.store.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.autoconfigure.domain.EntityScan;
// import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
// @EnableJpaRepositories
// @EntityScan(basePackages = { "com.store.backend.entity.Product" })
public class StoreApplicationBackend {

	public static void main(String[] args) {
		SpringApplication.run(StoreApplicationBackend.class, args);
	}

}
