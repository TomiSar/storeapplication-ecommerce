package com.store.backend.service.impl;

import com.store.backend.dto.*;
import com.store.backend.entity.*;
import com.store.backend.exception.*;
import com.store.backend.repository.*;
import com.store.backend.service.*;
import com.store.backend.util.*;
import lombok.*;
import org.springframework.beans.*;
import org.springframework.stereotype.*;

import java.util.*;
import java.util.stream.*;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    public boolean saveContact(ContactRequestDto contactRequestDto) {
        Contact contact = transformToEntity(contactRequestDto);
        contactRepository.save(contact);
        return true;
    }

    @Override
    public List<ContactRequestDto> getContacts() {
        return contactRepository.findAll()
                .stream().map(this::transformToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ContactResponseDto> getAllOpenMessages() {
        List<Contact> contacts = contactRepository.findByStatus(ApplicationConstants.OPEN_MESSAGE);
        return contacts.stream().map(this::mapToContactResponseDTO).collect(Collectors.toList());
    }

    @Override
    public void updateMessageStatus(Long contactId, String status) {
        Contact contact = contactRepository.findById(contactId).orElseThrow(
                () -> new ResourceNotFoundException("Contact", "ContactID", contactId.toString()));
        contact.setStatus(status);
        contactRepository.save(contact);
    }

    /** Transform ContactRequestDto to Contact entity **/
    private Contact transformToEntity(ContactRequestDto contactRequestDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactRequestDto, contact);
        contact.setStatus(ApplicationConstants.OPEN_MESSAGE);
        return contact;
    }

    /** Transform Contact entity to ContactRequestDto **/
    private ContactRequestDto transformToDTO(Contact contact) {
        ContactRequestDto contactRequestDto = new ContactRequestDto();
        BeanUtils.copyProperties(contact, contactRequestDto);
        contactRequestDto.setContactId(contact.getContactId());
        return contactRequestDto;
    }

    /** Map Contact entity to ContactResponseDto **/
    private ContactResponseDto mapToContactResponseDTO(Contact contact) {
        ContactResponseDto responseDTO = new ContactResponseDto(
                contact.getContactId(),
                contact.getName(),
                contact.getEmail(),
                contact.getMobileNumber(),
                contact.getMessage(),
                contact.getStatus());
        return responseDTO;
    }

}
