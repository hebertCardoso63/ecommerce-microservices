### Adicionado
#1 - Inicialização do Projeto
    Configuração Inicial:
        * Criação do repositório inicial do projeto.
        * Configuração básica do Docker e Docker Compose.
        * Criação das pastas principais: order-service, inventory-service, scripts.

### Adicionado
#2 - Implementação do Order Service
    Configuração do Order Service:
        * Criação da estrutura de diretórios e arquivos para o order-service.
        * Implementação do orderController para lidar com as solicitações de criação de pedidos.
        * Configuração do Dockerfile para o order-service.
    Comunicação com RabbitMQ:
        * Implementação do rabbitmqService para enviar mensagens ao RabbitMQ.
        * Implementação do connectRabbitMQ para gerenciar a conexão com o RabbitMQ.
    Validação de Dados:
        * Implementação de validação de dados com joi no order.js.

### Adicionado
#3 - Implementação do Inventory Service
    Configuração do Inventory Service:
        * Criação da estrutura de diretórios e arquivos para o inventory-service.
        * Implementação do inventoryController para processar mensagens de atualização de inventário.
        * Configuração do Dockerfile para o inventory-service.
    Consumo de Mensagens de RabbitMQ:
        * Implementação do rabbitmqService para consumir mensagens do RabbitMQ.
        * Integração do connectRabbitMQ para gerenciar a conexão com o RabbitMQ.

### Adicionado
#4 - Configuração do Banco de Dados e População Inicial
    Scripts de Banco de Dados:
        * Criação do script init.sql para criar e popular as tabelas Orders, Order_Items e Inventories.
    Configuração do Docker Compose:
        * Configuração dos volumes para persistência de dados.
        * Montagem do diretório scripts para execução automática dos scripts SQL.
  
### Adicionado
#5 - Automação de Inicialização
    Script de Inicialização:
        * Criação do script start_with_rabbitmq.sh para iniciar o RabbitMQ, obter seu IP e configurar a variável de ambiente RABBITMQ_URL.
        * Modificação do Docker Compose para usar o script de inicialização.

### Adicionado
#6 - Documentação
    Documentação do Projeto:
        * Criação do README.md detalhado com instruções de instalação e execução.
        * Explicação das decisões arquiteturais.
        * Inclusão de um diagrama BPMN para ilustrar o fluxo de processo.

### Modificado
#7 - Melhorias e Refatorações
    Refatoração de Código:
        * Melhoria na organização dos serviços e controladores.
        * Otimização do manuseio de mensagens no RabbitMQ.
    Atualização da Documentação:
        * Inclusão de explicações adicionais no README.md sobre o fluxo de dados e interação dos componentes.