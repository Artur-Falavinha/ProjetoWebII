package com.tads4.webdois.web.dto;

public class UsuarioResponse {
    private Long id;
    private String nome;
    private String email;
    private String perfil;

    // preciso criar construtor, Getters e Setters
    
    public UsuarioResponse(Long id, String nome, String email, String perfil) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.perfil = perfil;
    }
}