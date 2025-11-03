    /*package com.tads4.webdois.infra.service;
   
    import com.tads4.webdois.infra.service.EmailService;
    import com.tads4.webdois.domain.Usuario;
    import com.tads4.webdois.infra.repository.UsuarioRepository;
    import com.tads4.webdois.web.dto.RegistroRequest;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Service;

    import java.security.SecureRandom;
    import java.util.Random;

    @Service
    public class AuthService {

        @Autowired
        private UsuarioRepository usuarioRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;
        
        @Autowired
        private EmailService emailService;

        public Usuario registrarUsuario(RegistroRequest registroRequest) {
            if (usuarioRepository.existsByEmail(registroRequest.getEmail())) {
                throw new RuntimeException("Erro: E-mail já está em uso!");
            }
            if (usuarioRepository.existsByCpf(registroRequest.getCpf())) {
                throw new RuntimeException("Erro: CPF já está cadastrado!");
            }

            Usuario novoUsuario = new Usuario();
            novoUsuario.setNome(registroRequest.getNome());
            novoUsuario.setEmail(registroRequest.getEmail());
            novoUsuario.setCpf(registroRequest.getCpf());
            novoUsuario.setTelefone(registroRequest.getTelefone());
            novoUsuario.setPerfil(registroRequest.getPerfil().equals("CLIENT") ? "CLIENTE" : "FUNCIONARIO");
            
            if ("CLIENT".equalsIgnoreCase(registroRequest.getPerfil())) {
                novoUsuario.setEndereco(registroRequest.getEndereco());
            }

            String senhaAleatoria = gerarSenhaAleatoria();
            emailService.sendPasswordEmail(novoUsuario.getNome(), novoUsuario.getEmail(), senhaAleatoria);
        
            novoUsuario.setSenha(passwordEncoder.encode(senhaAleatoria));

            return usuarioRepository.save(novoUsuario);
        }

        private String gerarSenhaAleatoria() {
            Random random = new SecureRandom();
            int numero = 1000 + random.nextInt(9000);
            return String.valueOf(numero);
        }
    }*/