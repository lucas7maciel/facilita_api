
# Aplicação CRUD para clientes de uma empresa utilizando Node.js, Express.js e PostgreSQL!
_Frontend em:_ https://github.com/lucas7maciel/facilita_frontend

//colorar imagens, hostear

Neste projeto, é possível:
_/customers_
- Receber um JSON com todos os clientes (GET);
- Adicionar clientes (POST);
- Editar clientes (PUT);
- Excluir clientes (DELETE);

_/customers/:search_
- Receber um JSON com clientes filtrados por um valor dado (GET);

_/path_
- Traçar uma rota com o caminho mais curto que passe pela casa de todos os clientes (GET);

## DEPENDÊNCIAS
- PostgresSQL;
- Node.js;
- Express, Body Parser, Cors, Dotend, Express-load, Pg (bibliotecas);

A DDL do banco de dados está salva em ddl.txt e a aplicação está configurada para o Docker (Dockerfile).

## COMO EXECUTAR
Crie uma pasta para salvar o servidor e a interface;

Descompacte este repositório e o repositório do frontend (https://github.com/lucas7maciel/facilita_frontend) nesta pasta e nomeie como preferir, (vou me referir como api e frontend);

Abra um terminal na pasta criada, acesse o diretório da api e instale as dependências;
```
cd %api_pasta% && npm install
```

Em seguida, crie uma pasta .env e defina as variáveis de ambiente necessárias;
```
PORT=your_port
```

Execute a api
```
node index
```

Em seguida, abra outro terminal na pasta criada, acesse o diretório do frontend e instale as dependências;
```
cd %frontend_pasta% && npm install
```

Execute o React App
```
npm run start
```
