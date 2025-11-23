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
import com.tads4.webdois.web.dto.ClienteResponse;
import com.tads4.webdois.web.dto.FuncionarioRequest;
import com.tads4.webdois.web.dto.FuncionarioResponse;
import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.domain.Funcionario;
import com.tads4.webdois.domain.Usuario;
import com.tads4.webdois.domain.enums.RoleUsuario;
import com.tads4.webdois.infra.service.ClienteService;
import com.tads4.webdois.infra.service.FuncionarioService;
import com.tads4.webdois.infra.service.TokenService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Operações de login, registro e perfil do usuário.")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private FuncionarioService funcionarioService;

    @PostMapping("/register/funcionario")
    @Operation(summary = "Registrar novo funcionário", description = "Realiza o cadastro de um novo funcionário.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Funcionário cadastrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public ResponseEntity<FuncionarioResponse> registerFuncionario(@Valid @RequestBody FuncionarioRequest funcionario){
        FuncionarioResponse cadastrado = funcionarioService.addNewFuncionario(funcionario);
        return new ResponseEntity<>(cadastrado, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Login do usuário", description = "Autentica o usuário e retorna um token JWT.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
        @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    public LoginResponse login(@RequestBody @Valid LoginRequest data) {
        var UsernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authenticated = this.authenticationManager.authenticate(UsernamePassword);
        var token = this.tokenService.generateToken((Usuario) authenticated.getPrincipal());
        return new LoginResponse(token);
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar novo cliente", description = "Realiza o cadastro de um novo cliente.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Cliente cadastrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public ResponseEntity<ClienteResponse> register(@Valid @RequestBody ClienteRequest cliente){
        ClienteResponse cadastrado = clienteService.autocadastroCliente(cliente);
        return new ResponseEntity<ClienteResponse>(cadastrado, HttpStatus.CREATED);
    }
    
    @GetMapping("/me")
    @Operation(summary = "Obter usuário autenticado", description = "Retorna o objeto Cliente ou Funcionario conforme o usuário autenticado.")
    @ApiResponse(responseCode = "200", description = "Usuário retornado com sucesso")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails activeUser) {
        if (activeUser instanceof Usuario usuario) {
            if (usuario.getRole() == RoleUsuario.CLIENTE) {
                ClienteResponse cliente = clienteService.buscarPorId(usuario.getUserId());
                return ResponseEntity.ok(cliente);
            } else if (usuario.getRole() == RoleUsuario.FUNCIONARIO) {
               FuncionarioResponse funcionario = funcionarioService.buscarPorId(usuario.getUserId());
               System.out.println(funcionario.toString());
               return ResponseEntity.ok(funcionario); 
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado ou tipo desconhecido");
    }
}