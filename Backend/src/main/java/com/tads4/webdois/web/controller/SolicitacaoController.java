package com.tads4.webdois.web.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.time.LocalDate;
import java.util.List;

import com.tads4.webdois.web.dto.LogHistoricoResponse;
import com.tads4.webdois.web.dto.ManutencaoRequest;
import com.tads4.webdois.web.dto.OrcamentoRequest;
import com.tads4.webdois.web.dto.RedirecionarSolicitacaoRequest;
import com.tads4.webdois.web.dto.RejeitarSolicitacaoRequest;
import com.tads4.webdois.web.dto.SolicitacaoPatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;

import com.tads4.webdois.web.dto.SolicitacaoRequest;
import com.tads4.webdois.web.dto.SolicitacaoResponse;
import com.tads4.webdois.domain.enums.StatusSolicitacao;
import com.tads4.webdois.infra.service.SolicitacaoService;
import com.tads4.webdois.web.dto.SolicitacaoRequest;
// import com.tads4.webdois.web.dto.EtapaCreateDTO;
// import com.tads4.webdois.web.dto.EtapaHistoricoDTO;
import com.tads4.webdois.domain.enums.StatusSolicitacao;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin
@RestController
@Tag(name = "Solicitações", description = "Operações relacionadas às solicitações de manutenção e orçamento.")
public class SolicitacaoController {
    @Autowired
    private SolicitacaoService service;

    @PostMapping("/solicitacao")
    @PreAuthorize("hasAuthority('CLIENTE')")
    @Operation(summary = "Criar nova solicitação", description = "Cria uma nova solicitação de manutenção para o cliente autenticado.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Solicitação criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "409", description = "Conflito de dados")
    })
    public SolicitacaoResponse addNewChamado(@Valid @RequestBody SolicitacaoRequest newChamado,
            @AuthenticationPrincipal UserDetails activeUser) {
        return service.addNewSolicitacao(newChamado, activeUser);
    }

    @GetMapping("/solicitacao")
    @Operation(summary = "Listar solicitações", description = "Retorna todas as solicitações do usuário autenticado. Permite filtrar por status e datas.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    public List<SolicitacaoResponse> getChamados(
            @RequestParam(required = false) StatusSolicitacao status,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataInicio,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataFim,
            @AuthenticationPrincipal UserDetails activeUser) {
        return service.buscarSolicitacoes(status, dataInicio, dataFim, activeUser);
    }

    @GetMapping("/solicitacao/{id}")
    @Operation(summary = "Buscar solicitação por ID", description = "Retorna os detalhes de uma solicitação específica pelo seu ID.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Solicitação encontrada"),
        @ApiResponse(responseCode = "404", description = "Solicitação não encontrada")
    })
    public SolicitacaoResponse getChamadoById(@PathVariable Integer id) {
        return service.getSolicitacaoById(id);
    }

    // @PutMapping("solicitacao/{id}")
    // @Operation(summary = "Atualizar solicitação", description = "Atualiza os dados de uma solicitação existente.",
    //     security = @SecurityRequirement(name = "bearerAuth"))
    // @ApiResponses({
    //     @ApiResponse(responseCode = "200", description = "Solicitação atualizada com sucesso"),
    //     @ApiResponse(responseCode = "404", description = "Solicitação não encontrada")
    // })
    // public ResponseEntity<SolicitacaoResponse> updateChamado(
    //         @PathVariable Integer id,
    //         @Valid @RequestBody SolicitacaoPatch updatedChamado,
    //         @AuthenticationPrincipal UserDetails activeUser) {
    //     SolicitacaoResponse dto = service.patchSolicitacao(id, updatedChamado, activeUser);
    //     return ResponseEntity.ok(dto);
    // }   

    @PatchMapping("solicitacao/{id}")
    @Operation(summary = "Atualizar status da solicitação", description = "Atualiza o status da solicitação para ABERTA, FINALIZADA, PAGA ou APROVADA.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Solicitação atualizada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Solicitação não encontrada")
    })
    public ResponseEntity<SolicitacaoResponse> patchSolicitacao(
            @PathVariable Integer id,
            @Valid @RequestBody SolicitacaoPatch updatedChamado,
            @AuthenticationPrincipal UserDetails activeUser) {
        SolicitacaoResponse dto = service.patchSolicitacao(id, updatedChamado, activeUser);
        return ResponseEntity.ok(dto);
    }   

    @PutMapping("solicitacao/{id}/orcamento")
    @Operation(summary = "Efetuar orçamento", description = "Registra o orçamento de uma solicitação. Apenas funcionários podem executar.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Orçamento registrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "409", description = "Conflito de dados")
    })
    public ResponseEntity<SolicitacaoResponse> efetuarOrcamento(
            @PathVariable Integer id,
            @Valid @RequestBody OrcamentoRequest orcamento,
            @AuthenticationPrincipal UserDetails activeUser) {
        SolicitacaoResponse dto = service.efetuarOrcamento(id, orcamento, activeUser);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("solicitacao/{id}/redirect")
    @Operation(summary = "Redirecionar solicitação", description = "Redireciona a solicitação para outro funcionário.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Orçamento registrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "409", description = "Conflito de dados")
    })
    public ResponseEntity<SolicitacaoResponse> efetuarRedirect(
            @PathVariable Integer id,
            @Valid @RequestBody RedirecionarSolicitacaoRequest redirect,
            @AuthenticationPrincipal UserDetails activeUser) {
        SolicitacaoResponse dto = service.redirecionarSolicitacao(id, redirect.funcionarioDestinoId(), activeUser);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
    
    @PutMapping("solicitacao/{id}/reject")
    @Operation(summary = "Rejeitar solicitação", description = "Rejeita a solicitação informando o motivo.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Orçamento registrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "409", description = "Conflito de dados")
    })
    public ResponseEntity<SolicitacaoResponse> efetuarReject(
            @PathVariable Integer id,
            @Valid @RequestBody RejeitarSolicitacaoRequest reject,
            @AuthenticationPrincipal UserDetails activeUser) {
        SolicitacaoResponse dto = service.rejeitarSolicitacao(id, reject.motivoRejeicao(), activeUser);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("solicitacao/{id}/fix")
    @Operation(summary = "Efetuar manutenção", description = "Registra a manutenção realizada na solicitação.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Orçamento registrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos"),
        @ApiResponse(responseCode = "409", description = "Conflito de dados")
    })
    public ResponseEntity<SolicitacaoResponse> efetuarManutencao(
            @PathVariable Integer id,
            @Valid @RequestBody ManutencaoRequest reject,
            @AuthenticationPrincipal UserDetails activeUser) {
        SolicitacaoResponse dto = service.efetuarManutencao(id, reject, activeUser);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping("/solicitacao/{id}/historico")
    @Operation(summary = "Buscar histórico da solicitação", description = "Retorna o histórico de alterações da solicitação pelo seu ID.",
        security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Solicitação encontrada"),
        @ApiResponse(responseCode = "404", description = "Solicitação não encontrada")
    })
    public List<LogHistoricoResponse> getHistoricoListById(@PathVariable Integer id) {
        return service.listarHistoricoPorSolicitacao(id);
    }

}