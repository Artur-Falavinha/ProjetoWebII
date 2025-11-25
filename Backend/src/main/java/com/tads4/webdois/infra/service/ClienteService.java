package com.tads4.webdois.infra.service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tads4.webdois.web.dto.ClienteRequest;
import com.tads4.webdois.web.dto.ClienteResponse;
import com.tads4.webdois.web.dto.EnderecoRequest;
// import com.tads4.webdois.exception.BadRequestApiException;
// import com.tads4.webdois.exception.ResourceConflictException;
// import com.tads4.webdois.exception.ServerErrorException;
import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.domain.Endereco;
import com.tads4.webdois.domain.enums.RoleUsuario;
import com.tads4.webdois.infra.mapper.ClienteMapper;
import com.tads4.webdois.infra.repository.ClienteRepository;
import com.tads4.webdois.infra.repository.UsuarioRepository;
import com.tads4.webdois.exception.ConflictException;
import com.tads4.webdois.exception.NotFoundException;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Transactional
    public ClienteResponse autocadastroCliente(ClienteRequest cliente) {
        if (clienteRepository.existsByCpf(cliente.cpf())) {
            throw new ConflictException("ERRO: CPF já cadastrado");
        }
        if (usuarioRepository.existsByEmail(cliente.email())) {
            throw new ConflictException("ERRO: Email já cadastrado");
        }

        String senha = String.format("%04d", new Random().nextInt(10000));
        Cliente novo = ClienteMapper.fromRequest(cliente);
        novo.setEmail(novo.getEmail().toLowerCase());
        novo.setSenha(passwordEncoder.encode(senha));
        novo.setStatus(true);
        novo.setRole(RoleUsuario.CLIENTE);
        novo.getEndereco().setCep(novo.getEndereco().getCep().replace("-", ""));
        Cliente newCliente = clienteRepository.save(novo);
        emailService.sendPasswordEmail(newCliente.getNome(), newCliente.getEmail(), senha);
        return ClienteMapper.toResponse(newCliente);
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> getAllClientes() {
        return clienteRepository.findAll()
            .stream()
            .map(ClienteMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscarPorId(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("ERRO: Cliente não encontrado"));
        return ClienteMapper.toResponse(cliente);
    }

    @Transactional
    public ClienteResponse updateCliente(Integer id, Cliente clienteAtualizado) {
        Cliente clienteExistente = clienteRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("ERRO: Cliente não encontrado"));
        if (!clienteExistente.getEmail().equals(clienteAtualizado.getEmail()) &&
                usuarioRepository.existsByEmail(clienteAtualizado.getEmail())) {
            throw new ConflictException("ERRO: Email já cadastrado");
        }
        if (!clienteExistente.getCpf().equals(clienteAtualizado.getCpf()) &&
                clienteRepository.existsByCpf(clienteAtualizado.getCpf())) {
            throw new ConflictException("ERRO: CPF já cadastrado");
        }
        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setEmail(clienteAtualizado.getEmail());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setSenha(passwordEncoder.encode(clienteAtualizado.getSenha()));
        clienteExistente.setTelefone(clienteAtualizado.getTelefone());
        clienteExistente.setEndereco(clienteAtualizado.getEndereco());
        clienteExistente.setStatus(clienteAtualizado.isStatus());
        Cliente saved = clienteRepository.save(clienteExistente);
        return ClienteMapper.toResponse(saved);
    }

    public void deleteCliente(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("ERRO: Cliente não encontrado"));
        cliente.setStatus(false);
        clienteRepository.save(cliente);
    }

}