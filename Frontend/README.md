# Sistema de Manutenção de Equipamentos

> Sistema web para controle e gerenciamento de solicitações de manutenção de equipamentos

## 📋 Sobre o Projeto

Sistema desenvolvido para a disciplina de Desenvolvimento Web II, focado no gerenciamento eficiente de solicitações de manutenção de equipamentos. O sistema permite que clientes solicitem serviços e funcionários gerenciem essas solicitações através de diferentes perfis de acesso.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular CLI** (v20.1.6)
- **TypeScript** (v5.9.2)
- **Bootstrap** / **Angular Material**
- **RxJS**

### Backend
- **Spring Boot** (v3.x)
- **Java** (v17+)
- **Spring Security**
- **Spring Data JPA**
- **MySQL** / **PostgreSQL**

### Ferramentas de Desenvolvimento
- **Maven** (Gerenciamento de dependências)
- **Git** (Controle de versão)
- **Postman** (Testes de API)

## 🏗️ Arquitetura do Sistema

```
Sistema de Manutenção
├── Frontend (Angular)
│   ├── Módulo Cliente
│   ├── Módulo Funcionário
│   └── Módulo Compartilhado
└── Backend (Spring Boot)
    ├── Controllers (API REST)
    ├── Services (Lógica de Negócio)
    ├── Repositories (Acesso a Dados)
    └── Models/Entities
```

## 👥 Perfis de Usuário

### 🔵 Cliente
- Solicitar manutenção de equipamentos
- Acompanhar status das solicitações
- Visualizar histórico de serviços
- Avaliar serviços prestados

### 🔴 Funcionário
- Gerenciar solicitações de manutenção
- Atualizar status dos serviços
- Gerar relatórios
- Cadastrar equipamentos

## 📊 Funcionalidades Principais

- [ ] **Autenticação e Autorização**
  - [ ] Login/Logout
  - [ ] Controle de acesso por perfil
  - [ ] Recuperação de senha

- [ ] **Gestão de Equipamentos**
  - [ ] Cadastro de equipamentos
  - [ ] Listagem e busca
  - [ ] Histórico de manutenções

- [ ] **Solicitações de Manutenção**
  - [ ] Criar nova solicitação
  - [ ] Acompanhar status
  - [ ] Anexar documentos/fotos
  - [ ] Sistema de prioridades

- [ ] **Dashboard e Relatórios**
  - [ ] Painel administrativo
  - [ ] Relatórios de produtividade
  - [ ] Métricas de atendimento

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- **Node.js** (v22.18.0)
- **npm** (v10.9.3)
- **Angular CLI** (v20.1.6)
- **TypeScript** (v5.9.2)
- **Java JDK** (v17+)
- **Maven** (v3.8+)
- **MySQL** ou **PostgreSQL**
- **Git**

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd ProjetoWebII
   ```

2. **Configuração do Backend**
   ```bash
   cd backend
   # Configurar application.properties
   mvn clean install
   mvn spring-boot:run
   ```

3. **Configuração do Frontend**
   ```bash
   cd frontend
   npm install
   ng serve
   ```
   
   **Versões utilizadas:**
   - Node.js: v22.18.0
   - npm: v10.9.3
   - Angular CLI: v20.1.6
   - TypeScript: v5.9.2

4. **Configuração do Banco de Dados**
   ```sql
   CREATE DATABASE manutencao_equipamentos;
   ```

## 📁 Estrutura do Projeto

```
ProjetoWebII/
├── backend/
│   ├── src/main/java/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   └── config/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── guards/
│   ├── angular.json
│   └── package.json
├── docs/
│   ├── api-documentation.md
│   └── user-manual.md
└── README.md
```

## 🔄 Fluxo de Desenvolvimento

### Branches
- `main` - Produção
- `develop-own` - Desenvolvimento (cada membro do projeto terá sua branch para dev)
- `feature/nome-da-feature` - Novas funcionalidades
- `hotfix/nome-do-fix` - Correções urgentes

### Commits
Seguir padrão de commits convencionais:
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração
test: adiciona testes
```

## 🧪 Testes

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
npm run e2e
```

## 📚 Documentação

- [Documentação da API](docs/api-documentation.md)
- [Manual do Usuário](docs/user-manual.md)
- [Guia de Contribuição](CONTRIBUTING.md)

## 🚀 Deploy

### Desenvolvimento
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`
- Banco: `localhost:3306`

### Produção
*Instruções de deploy serão adicionadas conforme necessário*

## 👨💻 Equipe de Desenvolvimento

- **[Nome do Membro 1]** - Frontend Developer
- **[Nome do Membro 2]** - Backend Developer
- **[Nome do Membro 3]** - Full Stack Developer
- **[Nome do Membro 4]** - Database/DevOps

## 📝 Changelog

### [Unreleased]
- Configuração inicial do projeto
- Estrutura base do README

### [v0.1.0] - 2024-XX-XX
- Setup inicial do projeto
- Configuração do ambiente de desenvolvimento

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Web II.
---

**Status do Projeto:** 🚧 Em Desenvolvimento