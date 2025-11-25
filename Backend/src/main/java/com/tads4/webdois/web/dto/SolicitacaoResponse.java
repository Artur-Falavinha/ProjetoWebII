package com.tads4.webdois.web.dto;

import java.math.BigDecimal;
import java.time.Instant;

import com.tads4.webdois.domain.enums.StatusSolicitacao;

public record SolicitacaoResponse(
    Integer id,
    String client,
    String clientEmail,
    String funcionario,
    String funcionarioEmail,
    Integer categoriaId,
    String categoriaNome,
    String descricaoEquipamento,
    String descricaoFalha,
    BigDecimal precoBase,
    StatusSolicitacao situation,
    Instant dataCriacao,
    Instant dataResposta,
    BigDecimal orcamentoValor,
    String descricaoManutencao,
    String orientacoesManutencao
) {}