package com.tads4.webdois.domain;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import com.tads4.webdois.domain.enums.StatusSolicitacao;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_log_historico")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LogHistorico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "solicitacao_id", nullable = false)
    private Solicitacao solicitacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private StatusSolicitacao status;

    @Column(name = "comentario", columnDefinition = "TEXT")
    private String comentario;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private Instant dataCriacao;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "funcionario_id", nullable = true)
    private Funcionario funcionario;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "funcionario_anterior_id", nullable = true)
    private Funcionario funcionarioAnterior;

    @Column(name = "motivo_rejeicao", columnDefinition = "TEXT")
    private String motivoRejeicao;
}