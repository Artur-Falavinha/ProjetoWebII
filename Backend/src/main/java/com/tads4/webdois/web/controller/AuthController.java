package com.tads4.webdois.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tads4.webdois.web.dto.LoginRequest;
import com.tads4.webdois.web.dto.LoginResponse;
import com.tads4.webdois.web.dto.ClienteRequest;
import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.domain.Usuario;
import com.tads4.webdois.infra.service.ClienteService;
import com.tads4.webdois.infra.service.TokenService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ClienteService clienteService;


    @PostMapping("/Auth")
    public LoginResponse Auth(@RequestBody @Valid LoginRequest data) {
        var UsernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authenticated = this.authenticationManager.authenticate(UsernamePassword);
        
        var token = this.tokenService.generateToken((Usuario) authenticated.getPrincipal());

        return new LoginResponse(token);
    }

    @PostMapping("/register")
    public ResponseEntity<Cliente> register(@Valid @RequestBody ClienteRequest cliente){
        Cliente cadastrado = clienteService.autocadastroCliente(cliente);
        return new ResponseEntity<>(cadastrado, HttpStatus.CREATED);
    }
    
    @GetMapping("/me")
    public ResponseEntity<String> getMe(@AuthenticationPrincipal UserDetails activeUser) {
        return ResponseEntity.ok(activeUser.getUsername());
    }
}