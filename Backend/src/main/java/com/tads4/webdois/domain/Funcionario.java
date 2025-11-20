package com.tads4.webdois.domain;

import java.time.LocalDate;

import com.tads4.webdois.domain.enums.RoleUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@Table(name = "tbl_funcionario")
@PrimaryKeyJoinColumn(name = "user_id")
@Getter @Setter
public class Funcionario extends Usuario {

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    public Funcionario(){
        this.setRole(RoleUsuario.FUNCIONARIO);
    }

}