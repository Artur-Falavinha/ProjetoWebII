package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotBlank;

public record RejeitarSolicitacaoRequest(
    @NotBlank String motivoRejeicao
) {}
