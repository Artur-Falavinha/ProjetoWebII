package com.tads4.webdois.infra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tads4.webdois.domain.Funcionario;
import java.util.List;


public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer>{
    List<Funcionario> findByStatus(boolean status);
}