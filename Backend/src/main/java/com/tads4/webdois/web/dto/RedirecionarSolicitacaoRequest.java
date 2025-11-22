package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotNull;

public record RedirecionarSolicitacaoRequest(
    @NotNull Integer funcionarioDestinoId
) {}
