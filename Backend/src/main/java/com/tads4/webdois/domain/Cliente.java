package com.tads4.webdois.domain;

import com.tads4.webdois.domain.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@Table(name = "tbl_cliente")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter @Setter
public class Cliente extends Usuario {

    @Column(name = "cpf", length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(name = "telefone", length = 15, nullable = false)
    private String telefone;

    @Embedded
    private Endereco endereco;

    public Cliente(){
        this.setRole(RoleUsuario.CLIENTE);
    }
}