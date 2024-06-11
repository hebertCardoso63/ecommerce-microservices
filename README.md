# E-commerce Microservices

Este projeto demonstra a implementação de microserviços para um sistema de e-commerce. O sistema é composto por dois serviços principais: o serviço de pedidos (`order-service`) e o serviço de inventário (`inventory-service`). A comunicação entre os serviços é feita de forma assíncrona utilizando RabbitMQ.

## Pré-requisitos

- Docker e Docker Compose instalados na sua máquina.

## Passos para Rodar o Projeto

### 1. Clone o Repositório

```sh
git clone https://github.com/hebertCardoso63/ecommerce-microservices.git
cd ecommerce-microservices
```
### 2. Rodar o comando para subir os containers

Esse comando sobe o Docker com o PostgreSQL, RabbitMQ, inventory-service e order-service

`docker compose up --build`

### 3. Iniciando os serviços

### inventory-service
No diretório raiz do serviço (`./inventory-service`) utilize os seguintes comandos:

`npm install`

`npm start`

### order-service
No diretório raiz do serviço (`./order-service`) utilize os comandos:

`npm install`

`npm start`

### 4. Configurar Permissões de Execução

Certifique-se de que o script de inicialização tem permissão de execução:
Execute o comando a seguir na raiz do projeto `ecommerce-microservices`

`chmod +x start_with_rabbitmq.sh`

### 5. Iniciar os Serviços

Execute o script de inicialização para iniciar o RabbitMQ, obter seu IP, configurar a variável de ambiente e iniciar os serviços de aplicação:
Execute o comando a seguir na raiz do projeto `ecommerce-microservices`

`./start_with_rabbitmq.sh`

## Explicações Importantes

### Comunicação Assíncrona com RabbitMQ
A escolha de RabbitMQ para comunicação entre microserviços foi feita para garantir a escalabilidade e a resiliência do sistema. RabbitMQ permite que os serviços se comuniquem de forma assíncrona, o que é crucial para lidar com picos de carga e garantir que os serviços possam operar de forma independente.

### Script de Inicialização
O script start_with_rabbitmq.sh foi criado para resolver o problema de obter o endereço IP do RabbitMQ dinamicamente. Este script:

* Inicia os serviços RabbitMQ e Postgres.
* Espera o RabbitMQ estar pronto.
* Obtém o endereço IP do RabbitMQ e define a variável de ambiente RABBITMQ_URL.
* Cria um arquivo .env com a variável de ambiente para ser utilizado pelo Docker Compose.
* Inicia os serviços de aplicação.

### Docker Compose
O arquivo docker-compose.yml foi configurado para:

* Definir as dependências entre os serviços.
* Montar volumes para persistência de dados.
* Usar variáveis de ambiente para configurar a conexão com o banco de dados e RabbitMQ.
* Tabelas e Dados de Exemplo
* Um script SQL (init.sql) é executado na inicialização para criar as tabelas Orders, * * Order_Items e Inventories, e popular a tabela Inventories com dados de exemplo.

### Client (Browser ou Postman):
- Inicia a interação enviando solicitações HTTP para criar pedidos ou consultar informações.

### Order Service:
- Recebe solicitações de criação de pedidos.
- Persiste os dados dos pedidos no banco de dados PostgreSQL.
- Publica mensagens no RabbitMQ para notificar o Inventory Service sobre novos pedidos.

### Inventory Service:
- Consome mensagens do RabbitMQ para atualizar o inventário conforme os pedidos são feitos.
- Persiste os dados de inventário atualizados no banco de dados PostgreSQL.

### PostgreSQL Database:
- Armazena dados persistentes para ambos os serviços, garantindo a integridade e a disponibilidade dos dados.

### RabbitMQ Message Broker:
Sistema de mensagens que permite comunicação assíncrona entre os serviços.
O Order Service envia mensagens para o RabbitMQ, que são consumidas pelo Inventory Service.

### Explicação Detalhada
* Cliente: Envia solicitações HTTP ao Order Service.
* Order Service: Processa as solicitações de pedidos, salva os dados no PostgreSQL e envia mensagens ao RabbitMQ.
* RabbitMQ: Gerencia a fila de mensagens entre os serviços.
* Inventory Service: Recebe mensagens do RabbitMQ e atualiza o inventário no PostgreSQL.
* PostgreSQL: Banco de dados que armazena dados de pedidos e inventário.