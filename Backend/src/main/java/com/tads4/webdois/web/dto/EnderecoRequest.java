package com.tads4.webdois.web.dto;

public record EnderecoRequest(
    String cep,
    String logradouro,
    String complemento,
    String numero,
    String bairro,
    String cidade,
    String uf
) {}