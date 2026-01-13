package com.store.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.backend.dto.ProfileRequestDto;
import com.store.backend.dto.ProfileResponseDto;
import com.store.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ProfileController {

    private final ProfileService profileService;

    // Get user profile
    @GetMapping
    public ResponseEntity<ProfileResponseDto> getProfile() {
        ProfileResponseDto profileResponseDto = profileService.getProfile();
        log.info("Retrieved profile: {}", profileResponseDto);
        return ResponseEntity.ok(profileResponseDto);
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDto> updateProfile(
            @Validated @RequestBody ProfileRequestDto profileRequestDto) {
        ProfileResponseDto profileResponseDto = profileService.updateProfile(profileRequestDto);
        log.info("Updated profile: {}", profileResponseDto);
        return ResponseEntity.ok(profileResponseDto);
    }
}
