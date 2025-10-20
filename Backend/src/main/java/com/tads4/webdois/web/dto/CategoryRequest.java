package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequest(
        @NotBlank(message = "Nome da categoria não pode ser vazio") String name) {
}
