package com.tads4.webdois.infra.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import com.tads4.webdois.infra.mapper.SolicitacaoMapper;
import com.tads4.webdois.infra.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.tads4.webdois.web.dto.LogHistoricoResponse;
import com.tads4.webdois.web.dto.SolicitacaoRequest;
import com.tads4.webdois.web.dto.SolicitacaoResponse;
// import com.tads4.webdois.web.dto.EtapaCreateDTO;
// import com.tads4.webdois.web.dto.LogHistoricoDTO;
import com.tads4.webdois.web.dto.OrcamentoRequest;
import com.tads4.webdois.exception.*;
import com.tads4.webdois.domain.Categoria;
import com.tads4.webdois.domain.Solicitacao;
import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.domain.LogHistorico;
import com.tads4.webdois.domain.Funcionario;
import com.tads4.webdois.domain.enums.StatusSolicitacao;
import jakarta.transaction.Transactional;

@Service

public class SolicitacaoService {
    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private CategoriaRepository categoriaRepo;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private com.tads4.webdois.infra.repository.LogHistoricoRepository logHistoricoRepository;

    public SolicitacaoResponse addNewSolicitacao(SolicitacaoRequest dto, UserDetails activeUser) {
        if (!(activeUser instanceof Cliente)) {
            throw new ConflictException("Apenas clientes podem criar Solicitacoes");
        }

        Categoria categoria = categoriaRepo.findById(dto.categoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada"));
        var ch = new Solicitacao();
        ch.setCliente((Cliente) activeUser);
        ch.setFuncionario(null);
        ch.setCategoriaEquipamento(categoria);
        ch.setDescricaoEquipamento(dto.descricaoEquipamento());
        ch.setDescricaoFalha(dto.descricaoFalha());
        ch.setPrecoBase(categoria.getValorBase());
        ch.setStatus(StatusSolicitacao.ABERTA);
        var saved = solicitacaoRepository.save(ch);

        // Gera registro de LogHistorico
        LogHistorico log = new LogHistorico();
        log.setSolicitacao(saved);
        log.setStatus(StatusSolicitacao.ABERTA);
        log.setComentario("Solicitação criada");
        log.setFuncionario(null);
        log.setFuncionarioAnterior(null);
        log.setMotivoRejeicao(null);
        logHistoricoRepository.save(log);

        return SolicitacaoMapper.toResponse(saved);
    }

    public List<SolicitacaoResponse> buscarSolicitacoes(StatusSolicitacao status,
            LocalDate dataInicio,
            LocalDate dataFim,
            UserDetails activeUser) {
        ZoneId zone = ZoneId.of("America/Sao_Paulo");
        Cliente c = null;
        Funcionario f = null;
        if (activeUser instanceof Cliente) {
            c = (Cliente) activeUser;
        }
        if (activeUser instanceof Funcionario) {
            f = (Funcionario) activeUser;
        }

        var inicio = (dataInicio != null)
                ? dataInicio.atStartOfDay(zone).toInstant()
                : Instant.EPOCH;

        var fim = (dataFim != null)
                ? dataFim.plusDays(1).atStartOfDay(zone).minusNanos(1).toInstant()
                : Instant.now();

        if (c != null) {
            return SolicitacaoMapper.toResponseList(solicitacaoRepository
                    .findByClienteAndDataCriacaoBetweenOrderByDataCriacaoAsc(c, inicio, fim));
        }

        if (status != null) {
            return SolicitacaoMapper.toResponseList(solicitacaoRepository
                    .findByStatusAndDataCriacaoBetweenOrderByDataCriacaoAsc(status, inicio, fim));
        }

        return SolicitacaoMapper.toResponseList(solicitacaoRepository
                .findByFuncionarioAndDataCriacaoBetweenOrderByDataCriacaoAsc(f, inicio, fim));
    }

    public SolicitacaoResponse getSolicitacaoById(Integer id) {
        return SolicitacaoMapper
                .toResponse(solicitacaoRepository.findById(id).orElse(null));
    }

    @Transactional
    public SolicitacaoResponse updateSolicitacao(Integer id, SolicitacaoRequest dto, UserDetails activeUser) {
        Solicitacao ch = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitacao não encontrado"));

        Categoria categoria = categoriaRepo.findById(dto.categoriaId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada"));

        ch.setCategoriaEquipamento(categoria);
        ch.setDescricaoEquipamento(dto.descricaoEquipamento());
        ch.setDescricaoFalha(dto.descricaoFalha());
        // Só permite update para status ABERTA, ORCADA, ARRUMADA, FINALIZADA, PAGA, APROVADA
        if (dto.statusConserto() != null) {
            switch (dto.statusConserto()) {
                case REDIRECIONADA:
                case REJEITADA:
                    throw new BadRequestException("Use os métodos específicos para redirecionar ou rejeitar.");
                default:
                    ch.setStatus(dto.statusConserto());
            }
        }

        var saved = solicitacaoRepository.save(ch);

        LogHistorico log = new LogHistorico();
        log.setSolicitacao(saved);
        log.setStatus(saved.getStatus());
        log.setComentario(saved.getComentario());
        log.setFuncionario(null);
        log.setFuncionarioAnterior(null);
        logHistoricoRepository.save(log);

        return SolicitacaoMapper.toResponse(saved);
    }

    @Transactional
    public SolicitacaoResponse redirecionarSolicitacao(Integer id, Integer funcionarioDestinoId, UserDetails activeUser) {
        Solicitacao ch = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitacao não encontrada"));
        Funcionario atual = ch.getFuncionario();
        if (atual != null && atual.getUserId().equals(funcionarioDestinoId)) {
            throw new BadRequestException("Não é permitido redirecionar para si mesmo.");
        }
        Funcionario destino = funcionarioRepository.findById(funcionarioDestinoId)
                .orElseThrow(() -> new NotFoundException("Funcionário de destino não encontrado"));
        ch.setFuncionario(destino);
        ch.setStatus(StatusSolicitacao.REDIRECIONADA);
        var saved = solicitacaoRepository.save(ch);

        LogHistorico log = new LogHistorico();
        log.setSolicitacao(saved);
        log.setStatus(StatusSolicitacao.REDIRECIONADA);
        log.setComentario("Solicitação redirecionada para funcionário id=" + destino.getUserId());
        log.setFuncionario(destino);
        log.setFuncionarioAnterior(atual);
        log.setMotivoRejeicao(null);
        logHistoricoRepository.save(log);

        return SolicitacaoMapper.toResponse(saved);
    }

    @Transactional
    public SolicitacaoResponse rejeitarSolicitacao(Integer id, String motivoRejeicao, UserDetails activeUser) {
        Solicitacao ch = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitacao não encontrada"));
        ch.setStatus(StatusSolicitacao.REJEITADA);
        var saved = solicitacaoRepository.save(ch);

        LogHistorico log = new LogHistorico();
        log.setSolicitacao(saved);
        log.setStatus(StatusSolicitacao.REJEITADA);
        log.setComentario("Solicitação rejeitada");
        log.setFuncionario(saved.getFuncionario());
        log.setFuncionarioAnterior(null);
        log.setMotivoRejeicao(motivoRejeicao);
        logHistoricoRepository.save(log);

        return SolicitacaoMapper.toResponse(saved);
    }

    @Transactional
    public SolicitacaoResponse efetuarOrcamento(Integer id, OrcamentoRequest dto, UserDetails activeUser) {

        if (!(activeUser instanceof Funcionario)) {
            throw new ConflictException("Ação não permitida");
        }

        Funcionario funcionario = (Funcionario) activeUser;

        Solicitacao ch = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitacao não encontrado"));

        if (ch.getStatus() != StatusSolicitacao.ABERTA) {
            throw new ConflictException("Apenas um orçamento por Solicitacao");
        }

        if (dto.valor().compareTo(BigDecimal.ZERO) < 1) {
            throw new BadRequestException("Informe um valor de orçamento maior que zero.");
        }
        ZoneId zone = ZoneId.of("America/Sao_Paulo");

        ch.setValor(dto.valor());
        ch.setComentario(dto.comentario());
        ch.setDataResposta(ZonedDateTime.now(zone).toInstant());
        ch.setStatus(StatusSolicitacao.ORCADA);
        ch.setFuncionario(funcionario);

        Solicitacao savedSolicitacao = solicitacaoRepository.save(ch);

        LogHistorico log = new LogHistorico();
        log.setSolicitacao(ch);
        log.setStatus(savedSolicitacao.getStatus());
        log.setComentario(savedSolicitacao.getComentario());
        log.setFuncionario(savedSolicitacao.getFuncionario());
        log.setFuncionarioAnterior(null);
        log.setMotivoRejeicao(null);
        logHistoricoRepository.save(log);

        return SolicitacaoMapper.toResponse(savedSolicitacao);
    }

    
    public List<LogHistoricoResponse> listarHistoricoPorSolicitacao(Integer solicitacaoId) {
        List<LogHistorico> logs = logHistoricoRepository.findBySolicitacaoIdOrderByDataCriacaoAsc(solicitacaoId);
        List<LogHistoricoResponse> dtos = new ArrayList<>();
        for (LogHistorico log : logs) {
            dtos.add(new LogHistoricoResponse(
                    log.getId(),
                    log.getSolicitacao() != null ? log.getSolicitacao().getId() : null,
                    log.getStatus() != null ? log.getStatus().name() : null,
                    log.getComentario(),
                    log.getDataCriacao(),
                    log.getFuncionario() != null ? log.getFuncionario().getUserId() : null,
                    log.getFuncionario() != null ? log.getFuncionario().getNome() : null,
                    log.getFuncionarioAnterior() != null ? log.getFuncionarioAnterior().getUserId() : null,
                    log.getFuncionarioAnterior() != null ? log.getFuncionarioAnterior().getNome() : null,
                    log.getMotivoRejeicao()));
        }
        return dtos;
    }


    // @Transactional
    // public SolicitacaoResponse novaEtapa(Integer SolicitacaoId, EtapaCreateDTO
    // dto) {
    // Solicitacao Solicitacao = solicitacaoRepository.findById(SolicitacaoId)
    // .orElseThrow(() -> new ResourceNotFoundException("Solicitacao não
    // encontrado"));

    // Funcionario atual = Solicitacao.getFuncionario();
    // switch (dto.status()) {
    // case REJEITADA -> require(notBlank(dto.motivoRejeicao()), "motivoRejeicao
    // obrigatório");
    // case REDIRECIONADA -> {
    // require(Objects.nonNull(dto.funcionarioDestinoId()), "funcionarioDestinoId
    // obrigatório");
    // if (Solicitacao.getFuncionario().getIdUsuario() ==
    // dto.funcionarioDestinoId()) {
    // throw new BadRequestApiException("Não é permitido redirecionar um Solicitacao
    // para si mesmo.");
    // }

    // }
    // case ARRUMADA -> require(notBlank(dto.descricaoManutencao()),
    // "descricaoManutencao obrigatória");
    // case PAGA, FINALIZADA, ABERTA, APROVADA -> {
    // }
    // default -> {
    // }
    // }
    // LogHistorico etapa = gerarEtapa(Solicitacao, dto.status());
    // etapa.setMotivoRejeicao(dto.motivoRejeicao());
    // Solicitacao.getEtapas().add(etapa);

    // // efeitos colaterais no Solicitacao
    // switch (dto.status()) {
    // case REDIRECIONADA -> {
    // Funcionario destino =
    // funcionarioRepository.findById(dto.funcionarioDestinoId())
    // .orElseThrow(() -> new ResourceNotFoundException("Funcionário de destino não
    // encontrado"));
    // Solicitacao.setFuncionario(destino);
    // etapa.setFuncionario(destino);
    // etapa.setFuncionarioAnterior(atual);
    // }
    // case ARRUMADA -> {
    // Solicitacao.setDescricaoManutencao(dto.descricaoManutencao());
    // String orientacoes = dto.orientacoesCliente() != null ?
    // dto.orientacoesCliente() : null;
    // Solicitacao.setOrientacoesManutencao(orientacoes);
    // }
    // case PAGA, FINALIZADA -> Solicitacao.setDataResposta(Instant.now());
    // default -> {
    // }
    // }

    // Solicitacao.setStatus(dto.status());
    // Solicitacao salvo = solicitacaoRepository.save(Solicitacao);
    // return toDTO(salvo);
    // }

    // private LogHistorico gerarEtapa(Solicitacao Solicitacao, StatusSolicitacao
    // status) {

    // LogHistorico etapa = new LogHistorico();
    // etapa.setSolicitacao(Solicitacao);
    // etapa.setStatus(status);
    // etapa.setFuncionario(Solicitacao.getFuncionario());
    // return etapa;
    // }

    // public List<LogHistoricoDTO> listarEtapas(Integer SolicitacaoId, UserDetails
    // activeUser) {
    // Solicitacao Solicitacao = solicitacaoRepository.findById(SolicitacaoId)
    // .orElseThrow(() -> new ResourceNotFoundException("Solicitacao não
    // encontrado"));

    // if (activeUser instanceof Cliente cliente) {
    // if (!Objects.equals(Solicitacao.getCliente().getIdUsuario(),
    // cliente.getIdUsuario())) {
    // throw new ResourceNotFoundException();
    // }
    // }

    // return toEtapasDTO(Solicitacao.getEtapas());
    // }

    // private static SolicitacaoResponse toDTO(Solicitacao c) {
    // return new SolicitacaoResponse(
    // c.getId(),
    // c.getCliente().getNome(),
    // c.getCliente().getEmail(),
    // c.getFuncionario() != null ? c.getFuncionario().getNome() : null,
    // c.getFuncionario() != null ? c.getFuncionario().getEmail() : null,
    // c.getCategoria() != null ? c.getCategoria().getName() : null,
    // c.getDescricaoEquipamento(),
    // c.getDescricaoFalha(),
    // c.getPrecoBase(),
    // c.getOrcamento() != null ? c.getOrcamento().getComentario() : null,
    // c.getStatus() != null ? c.getStatus().name() : null,
    // c.getDataCriacao(),
    // c.getDataResposta(),
    // c.getOrcamento() != null ? c.getOrcamento().getValor() : null,
    // c.getSlug(),
    // c.getDescricaoManutencao() != null ? c.getDescricaoManutencao() : null,
    // c.getOrientacoesManutencao() != null ? c.getOrientacoesManutencao() : null);
    // }

    // private static FuncionarioDTO toFuncionarioDTO(Funcionario f) {
    // if (f == null)
    // return null;
    // return new FuncionarioDTO(
    // f.getIdUsuario(),
    // f.getNome(),
    // f.getEmail(),
    // f.getDataNascimento());
    // }

    // private static List<SolicitacaoResponse> toDTO(List<Solicitacao>
    // listaSolicitacoes) {
    // List<SolicitacaoResponse> lista = new ArrayList<>();
    // for (Solicitacao Solicitacao : listaSolicitacoes) {
    // lista.add(toDTO(Solicitacao));
    // }
    // return lista;
    // }

    // private static LogHistoricoDTO toEtapaDTO(LogHistorico e) {
    // if (e == null)
    // return null;
    // return new LogHistoricoDTO(
    // e.getId(),
    // e.getStatus() != null ? e.getStatus().name() : null,
    // e.getComentario(),
    // e.getDataCriacao(),
    // toFuncionarioDTO(e.getFuncionario()),
    // toFuncionarioDTO(e.getFuncionarioAnterior()),
    // e.getMotivoRejeicao(),
    // e.getSolicitacao().getOrcamento() != null ?
    // e.getSolicitacao().getOrcamento().getValor()
    // : BigDecimal.ZERO);
    // }

    // private static List<LogHistoricoDTO> toEtapasDTO(List<LogHistorico> etapas) {
    // if (etapas == null || etapas.isEmpty())
    // return java.util.Collections.emptyList();
    // return etapas.stream()
    // .filter(Objects::nonNull)
    // .map(SolicitacaoService::toEtapaDTO)
    // .collect(Collectors.toList());
    // }

    // private static void require(boolean condicao, String msg) {
    // if (!condicao) {
    // throw new BadRequestApiException(msg);
    // }
    // }

    // private static boolean notBlank(String s) {
    // return s != null && !s.isBlank();
    // }

    // private static String slugify(String s) {
    // return s == null ? null : s.trim().toLowerCase().replaceAll("\\s+", "-");
    // }

}