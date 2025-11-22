package com.tads4.webdois.infra.repository;

import com.tads4.webdois.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
}