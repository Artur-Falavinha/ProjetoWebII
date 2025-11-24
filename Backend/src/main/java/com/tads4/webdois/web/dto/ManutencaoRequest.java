package com.tads4.webdois.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ManutencaoRequest(
    @NotBlank(message = "Descrição da manutenção é obrigatória")
    @Size(max = 255, message = "Descrição da manutenção deve ter no máximo 255 caracteres")
    String descricaoManutencao,
    @NotBlank(message = "Orientação ao cliente é obrigatória")
    @Size(max = 255, message = "Orientação ao cliente deve ter no máximo 255 caracteres")
    String orientacaoCliente
) {}