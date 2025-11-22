package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EnderecoRequest(
    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "^\\d{8}$", message = "CEP deve ter 8 dígitos")
    String cep,

    @NotBlank(message = "Logradouro é obrigatório")
    @Size(max = 100, message = "Logradouro deve ter no máximo 100 caracteres")
    String logradouro,

    @Size(max = 100, message = "Complemento deve ter no máximo 100 caracteres")
    String complemento,

    @NotBlank(message = "Número é obrigatório")
    @Size(max = 10, message = "Número deve ter no máximo 10 caracteres")
    String numero,

    @NotBlank(message = "Bairro é obrigatório")
    @Size(max = 50, message = "Bairro deve ter no máximo 50 caracteres")
    String bairro,

    @NotBlank(message = "Cidade é obrigatória")
    @Size(max = 50, message = "Cidade deve ter no máximo 50 caracteres")
    String cidade,

    @NotBlank(message = "UF é obrigatória")
    @Pattern(regexp = "^[A-Z]{2}$", message = "UF deve ter 2 letras maiúsculas")
    String uf
) {}