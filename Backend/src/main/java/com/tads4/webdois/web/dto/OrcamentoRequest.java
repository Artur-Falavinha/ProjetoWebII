package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record OrcamentoRequest(
    @NotNull(message = "Valor é obrigatório")
    BigDecimal valor,

    @Size(max = 255, message = "Comentário deve ter no máximo 255 caracteres")
    String comentario
) {}