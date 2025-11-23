package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OrcamentoRequest(
        @NotNull(message = "Valor é obrigatório") BigDecimal valor) {
}