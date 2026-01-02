package com.store.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ContactRequestDto {

    private Long contactId;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Mobile is required")
    @Pattern(regexp = "^\\d{8,10}$", message = "Mobile number must be between 8 and 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Message is required")
    @Size(min =5, max = 500, message = "Message must be between 5 and 500 characters")
    private String message;

}
