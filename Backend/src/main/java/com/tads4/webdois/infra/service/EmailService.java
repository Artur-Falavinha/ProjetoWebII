package com.tads4.webdois.infra.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendPasswordEmail(String nome, String to, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("seu-email-configurado@gmail.com");
            message.setTo(to);
            message.setSubject("Bem-vindo ao GestorManutenção - Sua Senha");
            
            String text = String.format(
                "Olá, %s!\n\nSeu cadastro foi realizado com sucesso.\n\n" +
                "Sua senha de acesso inicial é: %s\n\nAtenciosamente,\nEquipe GestorManutenção",
                nome, password
            );
            message.setText(text);
            
            emailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar e-mail.", e);
        }
    }
}