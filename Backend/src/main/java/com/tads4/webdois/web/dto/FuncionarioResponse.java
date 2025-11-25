package com.tads4.webdois.web.dto;

import java.time.LocalDate;
import com.tads4.webdois.domain.enums.RoleUsuario;

public record FuncionarioResponse(
    Integer id,
    String nome,
    String email,
    LocalDate dataNascimento,
    RoleUsuario role
) {}