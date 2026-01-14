package com.store.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.store.backend.dto.ContactRequestDto;
import com.store.backend.dto.ContactResponseDto;
import com.store.backend.entity.Contact;
import com.store.backend.repository.ContactRepository;
import com.store.backend.service.impl.ContactServiceImpl;
import com.store.backend.util.ApplicationConstants;

@ExtendWith(MockitoExtension.class)

class ContactServiceImplTest {

    @Mock
    private ContactRepository contactRepository;

    @InjectMocks
    private ContactServiceImpl contactService;

    private ContactRequestDto testContactDto;

    @BeforeEach
    void setUp() {
        testContactDto = new ContactRequestDto();
        testContactDto.setName("Teppo");
        testContactDto.setEmail("teppo@matti.fi");
        testContactDto.setMobileNumber("0192837465");
        testContactDto.setMessage("JaSeppo");
    }

    private Contact createContact(String name, String email, String mobile, String message, String status) {
        Contact c = new Contact();
        c.setName(name);
        c.setEmail(email);
        c.setMobileNumber(mobile);
        c.setMessage(message);
        c.setStatus(status);
        return c;
    }

    @Test
    void testSaveContact_shouldSaveContactAndReturnTrue() {
        // Arrange
        Contact testContact = createContact("Matti", "matti@teppo.fi", "0192837465", "JaSeppo",
                ApplicationConstants.OPEN_MESSAGE);
        when(contactRepository.save(any(Contact.class))).thenReturn(testContact);

        // Act
        boolean result = contactService.saveContact(testContactDto);

        // Assert
        assertTrue(result);
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    void testGetContacts_ShouldReturnListOfContactRequestDtos() {
        // Arrange
        Contact matti = createContact("Matti", "matti@teppo.fi", "0192837465", "JaSeppo",
                ApplicationConstants.OPEN_MESSAGE);
        Contact chuck = createContact("Chuck", "chuck@norris.com", "90210666", "Walker From Texas",
                ApplicationConstants.OPEN_MESSAGE);
        List<Contact> testContacts = Arrays.asList(matti, chuck);
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

    @Test
    void getAllOpenMessages_returnsMappedDtos() {
        // Arrange
        Contact matti = createContact("Matti", "matti@teppo.fi", "0192837465", "JaSeppo",
                ApplicationConstants.OPEN_MESSAGE);
        Contact johanna = createContact("Johanna Tukiainen", "tuksu@mail.fi", "016283647", "Tuksu is the best",
                ApplicationConstants.OPEN_MESSAGE);
        List<Contact> testContacts = Arrays.asList(matti, johanna);
        when(contactRepository.findByStatus(ApplicationConstants.OPEN_MESSAGE)).thenReturn(testContacts);

        // Act
        List<ContactResponseDto> result = contactService.getAllOpenMessages();

        // Assert
        assertEquals(2, result.size());
        assertEquals("matti@teppo.fi", result.get(0).email());
        assertEquals("0192837465", result.get(0).mobileNumber());
        assertEquals("JaSeppo", result.get(0).message());
        assertEquals(ApplicationConstants.OPEN_MESSAGE, result.get(0).status());

        assertEquals("Johanna Tukiainen", result.get(1).name());
        assertEquals("tuksu@mail.fi", result.get(1).email());
        assertEquals("016283647", result.get(1).mobileNumber());
        assertEquals("Tuksu is the best", result.get(1).message());
        assertEquals(ApplicationConstants.OPEN_MESSAGE, result.get(1).status());
        verify(contactRepository, times(1)).findByStatus(ApplicationConstants.OPEN_MESSAGE);
    }

    @Test
    void updateMessageStatus_shouldUpdateStatusAndSave() {
        // Arrange
        Long contactId = 1L;
        String oldStatus = ApplicationConstants.OPEN_MESSAGE;
        String newStatus = "CLOSED";
        Contact contact = new Contact();
        contact.setContactId(contactId);
        contact.setStatus(oldStatus);
        when(contactRepository.findById(contactId)).thenReturn(java.util.Optional.of(contact));

        // Act
        contactService.updateMessageStatus(contactId, newStatus);

        // Assert
        assertEquals(newStatus, contact.getStatus());
        verify(contactRepository, times(1)).findById(contactId);
        verify(contactRepository, times(1)).save(contact);
    }

    @Test
    void updateMessageStatus_shouldThrowResourceNotFoundException_contactIdNotFound() {
        // Arrange
        Long invalidContactId = 101L;
        String newStatus = "CLOSED";
        when(contactRepository.findById(invalidContactId)).thenReturn(java.util.Optional.empty());

        // Act & Assert
        org.junit.jupiter.api.Assertions.assertThrows(
                com.store.backend.exception.ResourceNotFoundException.class,
                () -> contactService.updateMessageStatus(invalidContactId, newStatus));
        verify(contactRepository, times(1)).findById(invalidContactId);
    }

}
