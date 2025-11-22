package com.tads4.webdois.web.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FuncionarioRequest(
    @NotBlank String nome,
    @NotBlank String email,
    @NotBlank String senha,
    @NotNull LocalDate dataNascimento
) {}