package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.Email;

public record LoginRequest(@Email String email, String password) {

}
