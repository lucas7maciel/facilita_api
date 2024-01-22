
# Aplicação CRUD para clientes de uma empresa utilizando Node.js, Express.js e PostgreSQL!
_Frontend em:_ https://github.com/lucas7maciel/facilita_frontend

_API hosteada em:_ https://facilitapi.onrender.com/

### Neste projeto, é possível:

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
PORT=seu_port

POSTGRES_URL=seu_link // caso o banco esteja hosteado

//caso va usar um banco local
USER=seu_user_psql
HOST=seu_host_psql
DB=seu_db_psql
PASSW=sua_senha_psql
PORT=seu_port_psql
```

Vá em pool.js e configure a variável 'pool' de acordo com as necessidades do seu banco de dados
```
//para um banco hosteado
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

//para um banco local
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSW,
  port: process.env.PORT,
});
```

Execute a api
```
node index
```

Em seguida, abra outro terminal na pasta criada, acesse o diretório do frontend e instale as dependências;
```
cd %frontend_pasta% && npm install
```

Em seguida, crie uma pasta .env e defina as variáveis de ambiente necessárias;
```
REACT_APP_SERVER=url_do_seu_servidor_express
```

Execute o React App
```
npm run start
```
