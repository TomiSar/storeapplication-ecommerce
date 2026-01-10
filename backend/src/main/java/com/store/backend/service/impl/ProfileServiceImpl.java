package com.store.backend.service.impl;

import com.store.backend.dto.AddressDto;
import com.store.backend.dto.ProfileRequestDto;
import com.store.backend.dto.ProfileResponseDto;
import com.store.backend.entity.Address;
import com.store.backend.entity.Customer;
import com.store.backend.repository.CustomerRepository;
import com.store.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileServiceImpl implements ProfileService {

    private final CustomerRepository customerRepository;

    @Override
    public ProfileResponseDto getProfile() {
        Customer customer = getAuthenticatedCustomer();
        log.debug("Fetched profile for customer: {}", customer.getEmail());
        return mapCustomerToProfileResponseDto(customer);
    }

    @Override
    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        Customer customer = getAuthenticatedCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
        BeanUtils.copyProperties(profileRequestDto, customer);
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setState(profileRequestDto.getState());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        customer.setAddress(address);
        customer = customerRepository.save(customer);
        ProfileResponseDto profileResponseDto = mapCustomerToProfileResponseDto(customer);
        profileResponseDto.setEmailUpdated(isEmailUpdated);
        log.debug("Updated profile for customer: {}", customer.getEmail());
        return profileResponseDto;
    }

    private Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        log.debug("getAuthenticatedCustomer email: {}", email);
        return customerRepository.findByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + email));
    }

    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        BeanUtils.copyProperties(customer, profileResponseDto);
        if (customer.getAddress() != null) {
            AddressDto addressDto = new AddressDto();
            BeanUtils.copyProperties(customer.getAddress(), addressDto);
            profileResponseDto.setAddress(addressDto);
        }
        return profileResponseDto;
    }
}
