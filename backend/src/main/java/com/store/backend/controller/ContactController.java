package com.store.backend.controller;

import com.store.backend.dto.ContactRequestDto;
import com.store.backend.service.ContactService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public String saveContact(@RequestBody ContactRequestDto contactRequestDto) {
        boolean isSaved = contactService.saveContact(contactRequestDto);
        if (isSaved) {
            log.info("Contact request saved successfully: {}", contactRequestDto);
            return "Contact saved successfully";
        } else {
            log.error("Failed to save contact request: {}", contactRequestDto);
            return "An error occurred. Please try again later or contact support team.";
        }
    }

    @GetMapping
    public List<ContactRequestDto> getContacts() {
        List<ContactRequestDto> contacts = contactService.getContacts();
        log.info("Found {} contacts. Contacts: {} ", contacts.size(), contacts);
        return contacts;
    }

}
