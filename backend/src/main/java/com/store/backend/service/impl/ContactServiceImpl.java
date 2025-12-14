package com.store.backend.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import com.store.backend.service.ContactService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.store.backend.dto.ContactRequestDto;
import com.store.backend.entity.Contact;
import com.store.backend.repository.ContactRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    private Contact transformToEntity(ContactRequestDto contactRequestDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactRequestDto, contact);
        return contact;
    }

    private ContactRequestDto transformToDTO(Contact contact) {
        ContactRequestDto contactRequestDto = new ContactRequestDto();
        BeanUtils.copyProperties(contact, contactRequestDto);
        contactRequestDto.setContactId(contact.getId());
        return contactRequestDto;
    }

    @Override
    public boolean saveContact(ContactRequestDto contactRequestDto) {
        try {
            Contact contact = transformToEntity(contactRequestDto);
            contact.setCreatedAt(Instant.now());
            contact.setCreatedBy(contactRequestDto.getName());
            contactRepository.save(contact);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    @Override
    public List<ContactRequestDto> getContacts() {
        return contactRepository.findAll()
                .stream().map(this::transformToDTO).collect(Collectors.toList());
    }

}
