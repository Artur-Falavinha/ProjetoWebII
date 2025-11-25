package com.tads4.webdois.domain;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.tads4.webdois.domain.enums.StatusSolicitacao;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_solicitacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "funcionario_id", nullable = true)
    private Funcionario funcionario;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoriaEquipamento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private StatusSolicitacao status;

    @Column(name = "descricao_equipamento", columnDefinition = "TEXT", nullable = false)
    private String descricaoEquipamento;

    @Column(name = "descricao_falha", columnDefinition = "TEXT", nullable = false)
    private String descricaoFalha;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private Instant dataCriacao;

    @Column(name = "data_resposta")
    private Instant dataResposta;

    @OneToMany(mappedBy = "solicitacao", fetch = FetchType.EAGER, 
    cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("dataCriacao ASC")
    private List<LogHistorico> logHistoricos = new ArrayList<>();

    @Column(name = "valor_orcamento", precision = 12, scale = 2)
    private BigDecimal valor;

    @Column(name = "descricao_manutencao", nullable = true, length = 255)
    private String descricaoManutencao;

    @Column(name = "orientacoes_manutencao", nullable = true, length = 255)
    private String orientacoesManutencao;
}