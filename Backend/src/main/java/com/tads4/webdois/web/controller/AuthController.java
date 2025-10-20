/*package com.tads4.webdois.web.controller;

import com.tads4.webdois.domain.Usuario;
import com.tads4.webdois.web.dto.RegistroRequest;
import com.tads4.webdois.web.dto.UsuarioResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroRequest registroRequest) {
        try {
            Usuario usuarioSalvo = authService.registrarUsuario(registroRequest);
            UsuarioResponse response = new UsuarioResponse(
                usuarioSalvo.getId(),
                usuarioSalvo.getNome(),
                usuarioSalvo.getEmail(),
                usuarioSalvo.getPerfil()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
Ainda preciso ver como integrar com um service para autenticação e geração do token */