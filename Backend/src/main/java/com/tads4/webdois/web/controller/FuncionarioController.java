package com.tads4.webdois.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tads4.webdois.domain.Funcionario;
import com.tads4.webdois.domain.Usuario;
import com.tads4.webdois.infra.service.FuncionarioService;
import com.tads4.webdois.web.dto.FuncionarioRequest;
import com.tads4.webdois.web.dto.FuncionarioResponse;

import jakarta.validation.Valid;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@Tag(name = "Funcionários", description = "Operações relacionadas aos funcionários.")
public class FuncionarioController {
    @Autowired
    private FuncionarioService service;

    @GetMapping("/funcionarios")
    @Operation(summary = "Listar todos os funcionários", description = "Retorna uma lista de funcionários ativos.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<FuncionarioResponse>> listarTodosFuncionarios() {
        List<FuncionarioResponse> funcionarios = service.getAllFuncionariosAtivos();
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/funcionarios-menos-eu")
    @PreAuthorize("hasAuthority('FUNCIONARIO')")
    @Operation(summary = "Listar todos os funcionários menos o autenticado", description = "Retorna uma lista de funcionários ativos menos o autenticado.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<FuncionarioResponse>> listarTodosFuncionariosMenosEu(
            @AuthenticationPrincipal UserDetails usr) {
        Funcionario func = (Funcionario) usr;
        List<FuncionarioResponse> funcionarios = service.getAllFuncionariosAtivosMenosEu(func.getUserId());
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/funcionarios/{id}")
    @Operation(summary = "Buscar funcionário por ID", description = "Retorna um funcionário pelo seu ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Funcionário encontrado"),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<FuncionarioResponse> buscarFuncionarioPorId(
            @io.swagger.v3.oas.annotations.Parameter(description = "ID do funcionário", example = "1") @PathVariable Integer id) {
        FuncionarioResponse funcionario = service.buscarPorId(id);
        return ResponseEntity.ok(funcionario);
    }

    @PostMapping("/funcionarios")
    @Operation(summary = "Inserir funcionário", description = "Adiciona um novo funcionário.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Funcionário criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<FuncionarioResponse> inserirFuncionario(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dados do funcionário") @Valid @RequestBody FuncionarioRequest funcionario) {
        FuncionarioResponse newFuncionario = service.addNewFuncionario(funcionario);
        return new ResponseEntity<>(newFuncionario, HttpStatus.CREATED);
    }

    @PutMapping("/funcionarios/{id}")
    @Operation(summary = "Atualizar funcionário", description = "Atualiza os dados de uma funcionário existente.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Funcionário atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<FuncionarioResponse> atualizarFuncionario(
            @io.swagger.v3.oas.annotations.Parameter(description = "ID do funcionário", example = "1") @PathVariable Integer id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dados atualizados do funcionário") @Valid @RequestBody FuncionarioRequest funcionarioAtualizado) {
        FuncionarioResponse updatedFuncionario = service.updateFuncionario(id, funcionarioAtualizado);
        return ResponseEntity.ok(updatedFuncionario);
    }

    @DeleteMapping("/funcionarios/{id}")
    @Operation(summary = "Excluir funcionário", description = "Remove um funcionário pelo ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Funcionário excluído com sucesso"),
            @ApiResponse(responseCode = "400", description = "Não é possível excluir a si mesmo"),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> deletarFuncionario(
            @io.swagger.v3.oas.annotations.Parameter(description = "ID do funcionário", example = "1") @PathVariable Integer id,
            @AuthenticationPrincipal UserDetails me) {
        FuncionarioResponse funcionarioParaDeletar = service.buscarPorId(id);
        Usuario usuarioAutenticado = (Usuario) me;
        
        if (funcionarioParaDeletar.id().equals(usuarioAutenticado.getUserId())) {
            return ResponseEntity.badRequest().build();
        }
        
        service.deleteFuncionario(id);
        return ResponseEntity.noContent().build();
    }

}