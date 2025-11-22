package com.tads4.webdois.web.dto;

import java.time.LocalDate;

public record FuncionarioResponse(
    Integer id,
    String nome,
    String email,
    LocalDate dataNascimento
) {}