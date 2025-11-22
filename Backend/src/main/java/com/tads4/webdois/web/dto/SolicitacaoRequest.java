package com.tads4.webdois.web.dto;

import com.tads4.webdois.domain.enums.StatusSolicitacao;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SolicitacaoRequest(
    @NotNull(message = "Categoria é obrigatória")
    Integer categoriaId,

    @NotBlank(message = "Descrição do equipamento é obrigatória")
    @Size(max = 255, message = "Descrição do equipamento deve ter no máximo 255 caracteres")
    String descricaoEquipamento,

    @NotBlank(message = "Descrição da falha é obrigatória")
    @Size(max = 255, message = "Descrição da falha deve ter no máximo 255 caracteres")
    String descricaoFalha,

    StatusSolicitacao statusConserto,

    Integer novoFuncionarioId
) {}