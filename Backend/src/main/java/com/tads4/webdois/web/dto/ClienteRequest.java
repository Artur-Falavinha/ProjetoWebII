package com.tads4.webdois.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


public record ClienteRequest(
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    String nome,

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    String email,

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "^\\d{11}$", message = "CPF deve conter 11 dígitos")
    String cpf,

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "^[0-9()\\-+\\s]{8,20}$", message = "Telefone inválido")
    String telefone,

    @NotNull(message = "Endereço é obrigatório")
    @Valid
    EnderecoRequest endereco
) {}