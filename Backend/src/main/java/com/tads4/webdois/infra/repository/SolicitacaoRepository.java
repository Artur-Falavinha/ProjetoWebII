package com.tads4.webdois.infra.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

import com.tads4.webdois.domain.Solicitacao;
import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.domain.Funcionario;
import com.tads4.webdois.domain.enums.StatusSolicitacao;


public interface SolicitacaoRepository extends CrudRepository<Solicitacao, Integer> {
    List<Solicitacao> findAllByOrderByDataCriacaoAsc();

    @EntityGraph(attributePaths = {"cliente","funcionario","categoriaEquipamento"})
    List<Solicitacao> findByStatus(StatusSolicitacao status);
    List<Solicitacao> findByStatusAndDataCriacaoBetweenOrderByDataCriacaoAsc(StatusSolicitacao status, Instant inicio, Instant fim);
    List<Solicitacao> findByClienteAndDataCriacaoBetweenOrderByDataCriacaoAsc(Cliente cliente, Instant inicio, Instant fim);
    List<Solicitacao> findByFuncionarioAndDataCriacaoBetweenOrderByDataCriacaoAsc(Funcionario funcionario, Instant inicio, Instant fim);

}
