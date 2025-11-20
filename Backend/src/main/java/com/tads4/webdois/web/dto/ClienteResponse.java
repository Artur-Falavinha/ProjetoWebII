package com.tads4.webdois.web.dto;

public record ClienteResponse(
    Integer id,
    String nome,
    String email,
    String telefone,
    String cpf,
    EnderecoResponse endereco
) {}