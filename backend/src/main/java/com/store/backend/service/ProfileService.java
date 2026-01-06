package com.store.backend.service;


import com.store.backend.dto.ProfileRequestDto;
import com.store.backend.dto.ProfileResponseDto;

public interface ProfileService {

    ProfileResponseDto getProfile();

    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);
}
