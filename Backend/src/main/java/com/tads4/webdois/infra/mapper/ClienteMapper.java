package com.tads4.webdois.infra.mapper;

import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.web.dto.ClienteResponse;

public class ClienteMapper {
    public static ClienteResponse toResponse(Cliente cliente) {
        return new ClienteResponse(
            cliente.getUserId(),
            cliente.getNome(),
            cliente.getEmail(),
            cliente.getTelefone(),
            cliente.getCpf(),
            EnderecoResponseMapper.toResponse(cliente.getEndereco()),
            cliente.getRole()
        );
    }

    public static Cliente fromRequest(com.tads4.webdois.web.dto.ClienteRequest request) {
        com.tads4.webdois.domain.Cliente cliente = new com.tads4.webdois.domain.Cliente();
        cliente.setNome(request.nome());
        cliente.setEmail(request.email());
        cliente.setTelefone(request.telefone());
        cliente.setCpf(request.cpf());
        cliente.setEndereco(EnderecoResponseMapper.fromRequest(request.endereco()));
        return cliente;
    }
}
