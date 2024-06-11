#!/bin/bash

# Iniciar RabbitMQ e Postgres
docker-compose up -d rabbitmq db

# Esperar RabbitMQ iniciar
until docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rabbitmq; do
  echo "Esperando o RabbitMQ iniciar..."
  sleep 2
done

# Obter o IP do RabbitMQ
RABBITMQ_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rabbitmq)
export RABBITMQ_URL="amqp://$RABBITMQ_IP"

# Criar um arquivo .env com a variável de ambiente
echo "RABBITMQ_URL=amqp://$RABBITMQ_IP" > .env

# Iniciar os serviços de aplicação
docker-compose up --build
