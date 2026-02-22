package com.store.backend.repository;

import com.store.backend.entity.*;
import org.springframework.cache.annotation.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface RoleRepository extends JpaRepository<Role, Long> {

    // ROLE_USER -> CACHE MISS -> DB call -> Cache Store (ROLE_USER -> Role record) -> Customer 1
    // ROLE_USER -> CACHE HIT -> Customer 2
    // ROLE_ADMIN -> CACHE MISS -> DB call -> Cache Store (ROLE_ADMIN -> Role record) -> Customer X
    @Cacheable("roles")
    Optional<Role> findByName(String name);
}
