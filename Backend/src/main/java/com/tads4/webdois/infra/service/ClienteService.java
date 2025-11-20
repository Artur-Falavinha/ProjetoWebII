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
import com.tads4.webdois.web.dto.EnderecoRequest;
// import com.tads4.webdois.exception.BadRequestApiException;
// import com.tads4.webdois.exception.ResourceConflictException;
// import com.tads4.webdois.exception.ServerErrorException;
import com.tads4.webdois.domain.Cliente;
import com.tads4.webdois.domain.Endereco;
import com.tads4.webdois.domain.enums.RoleUsuario;
import com.tads4.webdois.infra.repository.ClienteRepository;
import com.tads4.webdois.infra.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;

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
    public Cliente autocadastroCliente(ClienteRequest cliente){
        if (clienteRepository.existsByCpf(cliente.cpf())){
            throw new RuntimeException("ERRO: CPF já cadastrado");
        }
        if (usuarioRepository.existsByEmail(cliente.email())){
            throw new RuntimeException("ERRO: Email já cadastrado");
        }

        if (!validarCliente(cliente)) {
            throw new RuntimeException("ERRO: Dados Inválidos");
        }

        String senha = String.format("%04d", new Random().nextInt(10000));
        Cliente novo = new Cliente();
        novo.setNome(cliente.nome());
        novo.setEmail(cliente.email().toLowerCase());
        novo.setCpf(cliente.cpf());
        novo.setTelefone(cliente.telefone());
        novo.setSenha(passwordEncoder.encode(senha));
        novo.setStatus(true);
        // garante role de sistema (mesmo que o construtor já defina)
        novo.setRole(RoleUsuario.CLIENTE);

        EnderecoRequest e = cliente.endereco();
        Endereco end = new Endereco();
        end.setCep(e.cep().replace("-", ""));
        end.setLogradouro(e.logradouro());
        end.setComplemento(e.complemento());
        end.setNumero(e.numero());
        end.setBairro(e.bairro());
        end.setCidade(e.cidade());
        end.setUf(e.uf());
        novo.setEndereco(end);

        Cliente newCliente = clienteRepository.save(novo);

        try{
            emailService.sendPasswordEmail(newCliente.getNome(), newCliente.getEmail(), senha);
        } catch (Exception ex){
            throw new RuntimeException("ERRO: Não foi possível enviar o email de cadastro");
        }

        return newCliente;
    }

    @Transactional(readOnly = true)
    public List<Cliente> getAllClientes(){
        return clienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("ERRO: Cliente não encontrado"));
    }

    @Transactional
    public Cliente updateCliente(Long id, Cliente clienteAtualizado){
        Cliente clienteExistente = buscarPorId(id);

        if (!clienteExistente.getEmail().equals(clienteAtualizado.getEmail()) &&
            usuarioRepository.existsByEmail(clienteAtualizado.getEmail())) {
            throw new IllegalArgumentException("ERRO: Email já cadastrado");
        }

        if (!clienteExistente.getCpf().equals(clienteAtualizado.getCpf()) &&
            clienteRepository.existsByCpf(clienteAtualizado.getCpf())) {
            throw new IllegalArgumentException("ERRO: CPF já cadastrado");
        }

        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setEmail(clienteAtualizado.getEmail());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setSenha(passwordEncoder.encode(clienteAtualizado.getSenha()));
        clienteExistente.setTelefone(clienteAtualizado.getTelefone());
        clienteExistente.setEndereco(clienteAtualizado.getEndereco());
        clienteExistente.setStatus(clienteAtualizado.isStatus());

        return clienteRepository.save(clienteExistente);
    }

    public void deleteCliente(Long id){
        Cliente cliente = buscarPorId(id);
        cliente.setStatus(false);
        clienteRepository.save(cliente);
    }

    public boolean patternMatchesEmail(String email) {
        String pattern = "^(.+)@(\\S+)$";
        return Pattern.compile(pattern).matcher(email).matches();
    }

    private boolean validarCliente(ClienteRequest dto) {

        if (dto.nome().trim().isBlank() || dto.nome().length() > 50) {
            return false;
        }

        if (dto.email().trim().isBlank() || !patternMatchesEmail(dto.email()) || 
        dto.email().length() > 50) {
            return false;
        }

        if (dto.cpf().trim().isBlank() || dto.cpf().length() != 11 ||
        !dto.cpf().matches("\\d+")) {
            return false;
        }

        if (dto.telefone().trim().isBlank() || dto.telefone().length() > 15 ||
        !dto.telefone().matches("\\d+")) {
            return false;
        }

        EnderecoRequest e = dto.endereco();

        if (e == null) return false;

        String cep = e.cep().replace("-", "");
        if (cep.isBlank() || !cep.matches("\\d+") || cep.length() != 8) {
            return false;
        }

        if (e != null && e.complemento().length() > 50) {
            return false;
        }

        if (e.numero().trim().isBlank() || e.numero().length() > 20) {
            return false;
        }

        if (e.bairro().trim().isBlank() || e.bairro().length() > 100) {
            return false;
        }

        if (e.cidade().trim().isBlank() || e.cidade().length() > 100) {
            return false;
        }

        String[] UFs = {"AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", 
        "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", 
        "RN", "RO", "RR", "RS", "SC", "SP", "SE", "TO"};

        if (!Arrays.asList(UFs).contains(e.uf().toUpperCase())) {
            return false;
        }

        return true;
    }

}