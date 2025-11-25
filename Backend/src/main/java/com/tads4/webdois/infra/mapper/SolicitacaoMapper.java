package com.tads4.webdois.infra.mapper;

import com.tads4.webdois.domain.Solicitacao;
import com.tads4.webdois.web.dto.SolicitacaoRequest;
import com.tads4.webdois.web.dto.SolicitacaoResponse;

import java.util.List;
import java.util.stream.Collectors;

public class SolicitacaoMapper {
    public static SolicitacaoResponse toResponse(Solicitacao s) {
        if (s == null) return null;
        return new SolicitacaoResponse(
            s.getId(),
            s.getCliente() != null ? s.getCliente().getNome() : null,
            s.getCliente() != null ? s.getCliente().getEmail() : null,
            s.getFuncionario() != null ? s.getFuncionario().getNome() : null,
            s.getFuncionario() != null ? s.getFuncionario().getEmail() : null,
            s.getCategoriaEquipamento() != null ? s.getCategoriaEquipamento().getId() : null,
            s.getCategoriaEquipamento() != null ? s.getCategoriaEquipamento().getNome() : null,
            s.getDescricaoEquipamento(),
            s.getDescricaoFalha(),
            s.getPrecoBase(),
            s.getStatus() != null ? s.getStatus() : null,
            s.getDataCriacao(),
            s.getDataResposta(),
            s.getValor(),
            s.getDescricaoManutencao(),
            s.getOrientacoesManutencao()
        );
    }

    public static List<SolicitacaoResponse> toResponseList(List<Solicitacao> lista) {
        return lista == null ? List.of() : lista.stream().map(SolicitacaoMapper::toResponse).collect(Collectors.toList());
    }

    public static Solicitacao fromRequest(SolicitacaoRequest dto) {
        // Implementação depende do uso do service para buscar entidades associadas
        throw new UnsupportedOperationException("Use o service para construir a entidade com associações corretas.");
    }
}
