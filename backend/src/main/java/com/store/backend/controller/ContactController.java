package com.store.backend.controller;

import java.util.List;

import com.store.backend.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.backend.service.ContactService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ContactController {

    private final ContactService contactService;
    private  final ContactInfoDto contactInfoDto;

    // Save contact request
    @PostMapping
    public ResponseEntity<String> saveContact(@Valid @RequestBody ContactRequestDto contactRequestDto) {
        contactService.saveContact(contactRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Contact request saved successfully");
    }

    // Get all contacts
    @GetMapping
    public ResponseEntity<List<ContactRequestDto>> getContacts() {
        List<ContactRequestDto> contacts = contactService.getContacts();
        log.info("Found {} contacts. Contacts: {} ", contacts.size(), contacts);
        return ResponseEntity.status(HttpStatus.OK).body(contacts);
    }

    // Get contact info (phone, email, address)
    @GetMapping("/info")
    public ResponseEntity<ContactInfoDto> getContactInfo() {
        return ResponseEntity.status(HttpStatus.OK).body(contactInfoDto);
    }
}
