package com.tads4.webdois.web.dto;

import java.time.Instant;

public record LogHistoricoResponse(
    Long id,
    Integer solicitacaoId,
    String status,
    String comentario,
    Instant dataCriacao,
    Integer funcionarioId,
    String funcionarioNome,
    Integer funcionarioAnteriorId,
    String funcionarioAnteriorNome,
    String motivoRejeicao
) {}
