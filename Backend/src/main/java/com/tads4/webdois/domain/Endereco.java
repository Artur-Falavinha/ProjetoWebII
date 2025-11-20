package com.tads4.webdois.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Column;

@Embeddable
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Endereco {
    
    @Column(name = "cep", length = 9)
    private String cep; 

    @Column(name = "logradouro", length = 50)
    private String logradouro;

    @Column(name = "complemento", length = 50)
    private String complemento;

    @Column(name = "numero", length = 20)
    private String numero;

    @Column(name = "bairro", length = 100)
    private String bairro;

    @Column(name = "cidade", length = 100)
    private String cidade; // 

    @Column(name = "uf", length = 2) 
    private String uf; 
}