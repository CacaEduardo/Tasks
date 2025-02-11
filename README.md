# Tarefa Manager - CRUD de Gerenciamento de Tarefas

## Descrição do Projeto

Este é um aplicativo CRUD de gerenciamento de tarefas. Ele permite adicionar, editar, visualizar e excluir tarefas de maneira simples e intuitiva.

O projeto é composto por duas partes:
- **Front-end**: Desenvolvido com **Next.js**.
- **Back-end**: Implementado com **PHP**.
- **Banco de Dados**: Utiliza **MySQL**.

## Instruções para Configuração e Execução com Docker

### 1. Clonar o Repositório

Primeiro, clone o repositório para a sua máquina local:

```bash
git clone https://github.com/CacaEduardo/Tasks.git
cd Tasks
```
### 2. Construir e Subir os Containers
Para construir e iniciar os containers, execute o seguinte comando dentro da pasta do repositório:

```bash
docker-compose up --build
```
### 3. Acessar a Aplicação
Após a execução bem-sucedida do comando, você poderá acessar as diferentes partes da aplicação:

- Front-end (Next.js): http://localhost:3000
- Back-end (PHP API): http://localhost:9000
- Banco de Dados MySQL: Está configurado para rodar na porta padrão 3306, mas normalmente você não interage diretamente com o banco de dados, pois a comunicação é feita pela API.

### 3. Parar os Containers
Quando terminar de trabalhar, para parar os containers em execução, use o seguinte comando:

```bash
docker-compose down
```
Este comando irá:

- Parar e remover os containers.
- Remover as redes e volumes criados pelo docker-compose.