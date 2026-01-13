package com.store.backend.service;

import java.util.List;

import com.store.backend.dto.ContactRequestDto;
import com.store.backend.dto.ContactResponseDto;

public interface ContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);

    List<ContactRequestDto> getContacts();

    List<ContactResponseDto> getAllOpenMessages();

    void updateMessageStatus(Long contactId, String status);
}
