package com.tads4.webdois.domain.enums;

public enum StatusSolicitacao {
    ABERTA("Aberta"),
    ORCADA("Orçada"),
    REJEITADA("Rejeitada"),
    APROVADA("Aprovada"),
    REDIRECIONADA("Redirecionada"),
    ARRUMADA("Arrumada"),
    PAGA("Paga"),
    FINALIZADA("Finalizada");

    private final String descricao;

    StatusSolicitacao(String descricao) { this.descricao = descricao; }
    public String getdescricao() { return descricao; }

    public static StatusSolicitacao fromdescricao(String descricao) {
        for (var v : values()) {
            if (v.descricao.equalsIgnoreCase(descricao)) return v;
        }
        throw new IllegalArgumentException("Status inválido: " + descricao);
    }
}
