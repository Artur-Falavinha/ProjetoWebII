package com.tads4.webdois.infra.mapper;

import com.tads4.webdois.domain.Funcionario;
import com.tads4.webdois.web.dto.FuncionarioResponse;

public class FuncionarioMapper {
    public static FuncionarioResponse toResponse(Funcionario funcionario) {
        return new FuncionarioResponse(
            funcionario.getUserId(),
            funcionario.getNome(),
            funcionario.getEmail(),
            funcionario.getDataNascimento(),
            funcionario.getDataAdmissao(),
            funcionario.getCargo(),
            funcionario.getTelefone(),
            funcionario.isStatus()
        );
    }

    public static Funcionario fromRequest(com.tads4.webdois.web.dto.FuncionarioRequest request) {
        com.tads4.webdois.domain.Funcionario funcionario = new com.tads4.webdois.domain.Funcionario();
        funcionario.setNome(request.nome());
        funcionario.setEmail(request.email());
        funcionario.setDataNascimento(request.dataNascimento());
        funcionario.setDataAdmissao(request.dataAdmissao());
        funcionario.setCargo(request.cargo());
        funcionario.setTelefone(request.telefone());
        return funcionario;
    }
}
