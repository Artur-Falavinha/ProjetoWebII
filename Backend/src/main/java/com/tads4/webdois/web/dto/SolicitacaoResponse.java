package com.tads4.webdois.web.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record SolicitacaoResponse(
    Integer id,
    String cliente,
    String clienteEmail,
    String funcionario,
    String funcionarioEmail,
    Integer categoriaId,
    String categoriaNome,
    String descricaoEquipamento,
    String descricaoFalha,
    BigDecimal precoBase,
    String status,
    Instant dataCriacao,
    Instant dataResposta,
    BigDecimal orcamentoValor,
    String descricaoManutencao,
    String orientacoesManutencao
) {}