package com.tads4.webdois.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.infra.service.ClienteService;
import com.tads4.webdois.web.dto.ClienteResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;


@RestController
@Tag(name = "Clientes", description = "Operações relacionadas aos clientes.")
public class ClienteController {
    @Autowired
    private ClienteService service;

    @GetMapping("/cliente")
    @Operation(summary = "Listar todos os clientes", description = "Retorna uma lista de clientes cadastrados.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<ClienteResponse>> listarTodosClientes(){
        List<ClienteResponse> clientes = service.getAllClientes();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/cliente/{id}")
    @Operation(summary = "Buscar cliente por ID", description = "Retorna um cliente pelo seu ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ClienteResponse> buscarClientePorId(@PathVariable Integer id) {
        ClienteResponse cliente = service.buscarPorId(id);
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/cliente/{id}")
    @Operation(summary = "Atualizar cliente", description = "Atualiza os dados de um cliente existente.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cliente atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ClienteResponse> atualizarCliente(@PathVariable Integer id, @RequestBody Cliente clienteAtualizado){
        ClienteResponse updatedCliente = service.updateCliente(id, clienteAtualizado);
        return ResponseEntity.ok(updatedCliente);
    }

    @DeleteMapping("/cliente/{id}")
    @Operation(summary = "Excluir cliente", description = "Remove um cliente pelo ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Cliente excluído com sucesso"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Void> deletarCliente(@PathVariable Integer id) {
        service.deleteCliente(id); 
        return ResponseEntity.noContent().build();
    }
    
}