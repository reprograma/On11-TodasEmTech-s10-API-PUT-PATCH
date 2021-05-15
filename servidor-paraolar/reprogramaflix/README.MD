PROJETO NAYARA - REPROGRAMA FLIX

#Rotas

#[GET] **"/filmes/todos"** -- _getAll_ -- retorna todos os filmes;

#[GET] **"/filmes/:id"** -- _getById_ -- retorna um filme específico por ID;

#[GET] **"/filmes/title"** -- _getByTitle_ -- retorna um filme pelo título;

#[GET] **"/filmes/genre"** -- _getByGenre_ -- retorna filmes pelo gênero;

#[POST] **"/filmes/cadastrar"** -- _cadastrarFilmes_ -- cadastrar um novo filme;

#O que deve ser retornado:
```
{
        "id": ID randômico,
        "Title": "string",
        "Year":"string",
        "Rated":"string",
        "Released":"string",
        "Runtime":"string",
        "Genre":"string",
        "Director":"string",
        "Writer":"string",
        "Actors":"string",
        "Plot":"string",
        "Country":"string",
        "Awards":"string"
    }
```
#[PUT] **"/filmes/:id"** -- _atualizarFilmes_ -- atualiza um informações sobre um filme;

#[PATCH] **"/filmes/atualizar/:id"** -- _patchFilmes_ -- atualiza qualquer parte do filme separadamente;

#[DELETE] **"/filmes/:id"** -- _deleteFilmes_ -- deleta um filme pelo ID.