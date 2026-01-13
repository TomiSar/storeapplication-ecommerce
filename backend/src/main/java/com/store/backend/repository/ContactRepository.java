package com.store.backend.repository;

import com.store.backend.entity.Contact;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {

  List<Contact> findByStatus(String status);
}
