package com.tads4.webdois.infra.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tads4.webdois.infra.repository.UsuarioRepository;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDetails user = usuarioRepository.findByEmail(username);
        
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        
        return user;
    }

    public boolean existsByEmail(String login){
        UserDetails user = usuarioRepository.findByEmail(login);

        if (user != null) return true;
        
        return false;
    }
}