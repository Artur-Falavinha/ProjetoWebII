package com.tads4.webdois.infra.repository;

import com.tads4.webdois.domain.LogHistorico;
import com.tads4.webdois.domain.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LogHistoricoRepository extends JpaRepository<LogHistorico, Long> {
    List<LogHistorico> findBySolicitacaoIdOrderByDataCriacaoAsc(Integer solicitacaoId);
}
