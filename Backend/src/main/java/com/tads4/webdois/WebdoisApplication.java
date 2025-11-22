package com.tads4.webdois;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.tads4.webdois.infra.seed.SeedService;

@SpringBootApplication
public class WebdoisApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebdoisApplication.class, args);
	}

	@Bean
	CommandLineRunner run(SeedService seedService) {
		return args -> {
			System.out.println("Executando SeedService");

			seedService.createDefaultFuncionarios();

			seedService.createDefaultClientes();

			// seedService.createDefaultEquipments();

			seedService.createAdminUser();

			// seedService.createDefaultChamados();

			System.out.println("Banco de dados populado com sucesso!!!");
		};
	}

}
