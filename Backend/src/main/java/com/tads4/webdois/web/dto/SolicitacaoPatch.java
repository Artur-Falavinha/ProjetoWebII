package com.tads4.webdois.web.dto;

import com.tads4.webdois.domain.enums.StatusSolicitacao;

import jakarta.validation.constraints.NotNull;

public record SolicitacaoPatch(@NotNull StatusSolicitacao status) {

}
