# Adonis fullstack application

Foi adotado o Adonis como framework para o back-end

## Endpoints

Registro de usuário

```
POST
Form data: {
  name: string
  email: string
  password: string
}
/register
```

Login de usuário

```
POST
Form data: {
  email: string
  password: string
}
/authenticate
```

Retorno da Punk API (precisa do header com JWT token)

```
GET
/brews/:page/:per_page

page: número da página
per_page: número de resultados
```

## Setup

Primeiro é preciso instalar o CLI do Adonis na linha de comando `npm i -g @adonisjs/cli` (ou use o npx)

Rode este comando para gerar um APP_KEY no arquivo .env

```bash
adonis key:generate
```

Exemplo de .env:

```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=nzHxSXHrKKlxSreq8AAYrIyqpdKA6NKT
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```

depois rode um `npm install`.

### Migrations

Rode este comando para crias as tabelas no banco

```js
adonis migration:run
```

### Debug

Foi adicionado um launcher de debug do vscode com nodemon e um script debug no package.json `npm run debug`
