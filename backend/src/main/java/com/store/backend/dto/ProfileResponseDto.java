package com.store.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProfileResponseDto {
    private Long customerId;
    private String name;
    private String email;
    private String mobileNumber;
    private AddressDto address;
    private boolean emailUpdated;
}
