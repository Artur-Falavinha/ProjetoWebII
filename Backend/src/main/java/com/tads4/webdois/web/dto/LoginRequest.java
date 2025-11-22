package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
	@Email(message = "Email inválido")
	@NotBlank(message = "Email é obrigatório")
	String email,

	@NotBlank(message = "Senha é obrigatória")
	String password
) {}
