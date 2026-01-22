package com.store.backend.repository;

import com.store.backend.entity.Contact;

import java.util.List;

import org.springframework.data.jpa.repository.*;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findByStatus(String status);

    @Query(name = "Contact.findByStatus")
    List<Contact> fetchByStatus(String status);

    List<Contact> findByStatusNativeQuery(String status);
}
