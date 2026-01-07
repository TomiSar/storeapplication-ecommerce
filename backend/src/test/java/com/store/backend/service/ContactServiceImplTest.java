package com.store.backend.service;

import com.store.backend.dto.ContactRequestDto;
import com.store.backend.entity.Contact;
import com.store.backend.repository.ContactRepository;
import com.store.backend.service.impl.ContactServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactServiceImplTest {

    @Mock
    private ContactRepository contactRepository;

    @InjectMocks
    private ContactServiceImpl contactService;

    private ContactRequestDto testContactDto;
    private Contact testContactUno;
    private Contact testContactDos;

    @BeforeEach
    void setUp() {
        testContactDto = new ContactRequestDto();
        testContactDto.setName("Teppo");
        testContactDto.setEmail("teppo@matti.fi");
        testContactDto.setMobileNumber("0192837465");
        testContactDto.setMessage("JaSeppo");

        testContactUno = new Contact();
        testContactUno.setName("Matti");
        testContactUno.setEmail("matti@teppo.fi");
        testContactUno.setMobileNumber("0192837465");
        testContactUno.setMessage("JaSeppo");
    }

    @Test
    void testSaveContact_shouldSaveContactAndReturnTrue() {
        // Arrange
        when(contactRepository.save(any(Contact.class))).thenReturn(testContactUno);

        // Act
        boolean result = contactService.saveContact(testContactDto);

        // Assert
        assertTrue(result);
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    void testGetContacts_ShouldReturnListOfContactRequestDtos() {
        // Arr
        testContactDos = new Contact();
        testContactDos.setName("Chuck");
        testContactDos.setEmail("chuck@norris.com");
        testContactDos.setMobileNumber("90210666");
        testContactDos.setMessage("Walker From Texas");


        List<Contact> testContacts = Arrays.asList(testContactUno, testContactDos);
        when(contactRepository.findAll()).thenReturn(testContacts);

        // Act
        List<ContactRequestDto> result = contactService.getContacts();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());

        assertEquals("Matti", result.get(0).getName());
        assertEquals("matti@teppo.fi", result.get(0).getEmail());
        assertEquals("90210666", result.get(1).getMobileNumber());
        assertEquals("Walker From Texas", result.get(1).getMessage());

        verify(contactRepository, times(1)).findAll();
    }

    @Test
    void testGetContacts_ShouldReturnEmptyList_WhenNoContacts() {
        // Arr
        when(contactRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<ContactRequestDto> result = contactService.getContacts();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(contactRepository, times(1)).findAll();
    }

}

