package com.tads4.webdois.web.dto;

import com.tads4.webdois.domain.enums.RoleUsuario;

public record ClienteResponse(
    Integer id,
    String nome,
    String email,
    String telefone,
    String cpf,
    EnderecoResponse endereco,
    RoleUsuario role
) {}