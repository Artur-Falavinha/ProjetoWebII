package com.tads4.webdois.web.dto;

public record ClienteRequest(
    String nome,
    String email,
    String cpf,
    String telefone,
    EnderecoRequest endereco
) {}