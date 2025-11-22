package com.tads4.webdois.infra.mapper;

import com.tads4.webdois.domain.Endereco;
import com.tads4.webdois.web.dto.EnderecoResponse;

public class EnderecoResponseMapper {
    public static EnderecoResponse toResponse(Endereco endereco) {
        if (endereco == null) return null;
        return new EnderecoResponse(
            endereco.getCep(),
            endereco.getLogradouro(),
            endereco.getComplemento(),
            endereco.getNumero(),
            endereco.getBairro(),
            endereco.getCidade(),
            endereco.getUf()
        );
    }

    public static Endereco fromRequest(com.tads4.webdois.web.dto.EnderecoRequest request) {
        com.tads4.webdois.domain.Endereco endereco = new com.tads4.webdois.domain.Endereco();
        endereco.setCep(request.cep());
        endereco.setLogradouro(request.logradouro());
        endereco.setComplemento(request.complemento());
        endereco.setNumero(request.numero());
        endereco.setBairro(request.bairro());
        endereco.setCidade(request.cidade());
        endereco.setUf(request.uf());
        return endereco;
    }
}
