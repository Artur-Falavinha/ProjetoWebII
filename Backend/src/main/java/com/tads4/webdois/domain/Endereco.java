package com.tads4.webdois.domain;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "enderecos")
public class Endereco implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cep;
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
        
    // preciso gerar getter e setters
}
