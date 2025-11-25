


package com.tads4.webdois.web.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FuncionarioRequest(
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    String nome,

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    String email,

    @NotNull(message = "Data de nascimento é obrigatória")
    LocalDate dataNascimento,

    @NotNull(message = "Data de admissão é obrigatória")
    LocalDate dataAdmissao,

    @NotBlank(message = "Cargo é obrigatório")
    String cargo,

    @NotBlank(message = "Telefone é obrigatório")
    @Size(max = 15, message = "Telefone deve ter no máximo 15 caracteres")
    String telefone
) {}