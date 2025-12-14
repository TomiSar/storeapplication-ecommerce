package com.store.backend.service;

import java.util.List;

import com.store.backend.dto.ContactRequestDto;

public interface ContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);

    List<ContactRequestDto> getContacts();
}
