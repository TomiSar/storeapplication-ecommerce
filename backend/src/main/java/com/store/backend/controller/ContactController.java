package com.store.backend.controller;

import com.store.backend.dto.ContactRequestDto;
import com.store.backend.service.ContactService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ContactController {

    private final ContactService contactService;

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
}
