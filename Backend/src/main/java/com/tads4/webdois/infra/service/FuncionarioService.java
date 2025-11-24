package com.tads4.webdois.infra.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tads4.webdois.domain.Funcionario;
import com.tads4.webdois.infra.mapper.FuncionarioMapper;
import com.tads4.webdois.infra.repository.FuncionarioRepository;
import com.tads4.webdois.infra.repository.UsuarioRepository;
import com.tads4.webdois.web.dto.FuncionarioRequest;
import com.tads4.webdois.web.dto.FuncionarioResponse;
import com.tads4.webdois.exception.ConflictException;
import com.tads4.webdois.exception.NotFoundException;



@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
        public List<FuncionarioResponse> getAllFuncionariosAtivos() {
            return funcionarioRepository.findByStatus(true)
                .stream()
                .map(FuncionarioMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
        public List<FuncionarioResponse> getAllFuncionariosAtivosMenosEu(Integer id) {
            return funcionarioRepository.findByStatus(true)
                .stream()
                .filter(f -> !f.getUserId().equals(id))
                .map(FuncionarioMapper::toResponse)
                .toList();
    }
    
    @Transactional(readOnly = true)
        public FuncionarioResponse buscarPorId(Integer id) {
            Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Funcionário não encontrado"));
            return FuncionarioMapper.toResponse(funcionario);
    }

    @Transactional
    public FuncionarioResponse addNewFuncionario(FuncionarioRequest funcionario) {

        if (usuarioRepository.existsByEmail(funcionario.email())){
            throw new ConflictException("Funcionário já existe");
        } 

        Funcionario newFuncionario = FuncionarioMapper.fromRequest(funcionario);
        newFuncionario.setSenha(passwordEncoder.encode(newFuncionario.getSenha()));
        newFuncionario.setStatus(true);
        funcionarioRepository.save(newFuncionario);
        return FuncionarioMapper.toResponse(newFuncionario);
    }

    @Transactional
    public FuncionarioResponse updateFuncionario(Integer id, FuncionarioRequest funcionarioAtualizado) {
        Funcionario funcionarioExistente = funcionarioRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Funcionário não encontrado"));

        if (!funcionarioExistente.getEmail().equals(funcionarioAtualizado.email()) &&
            usuarioRepository.existsByEmail(funcionarioAtualizado.email())) {
            throw new ConflictException("Email já cadastrado");
        }

        funcionarioExistente.setNome(funcionarioAtualizado.nome());
        funcionarioExistente.setEmail(funcionarioAtualizado.email());
        funcionarioExistente.setSenha(passwordEncoder.encode(funcionarioAtualizado.senha()));
        funcionarioExistente.setDataNascimento(funcionarioAtualizado.dataNascimento());
        Funcionario saved = funcionarioRepository.save(funcionarioExistente);
        return FuncionarioMapper.toResponse(saved);
    }

    @Transactional
    public void deleteFuncionario(Integer id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Funcionário não encontrado"));
        
        funcionario.setStatus(false);
        funcionarioRepository.save(funcionario);
    }

}