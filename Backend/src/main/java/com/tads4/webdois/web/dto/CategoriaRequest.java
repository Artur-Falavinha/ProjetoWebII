package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoriaRequest(
        @NotBlank(message = "Nome da categoria não pode ser vazio") String nome
) {}
