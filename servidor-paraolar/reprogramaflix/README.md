## Documentação Reprogramaflix

------

### [GET] "/filmes/all"

getAll retorna todos os filmes.

------

### [GET] "/filmes/id"

getById retorna um filme por id.

------

### [GET] "/filmes/title"

getByTitle retorna um filme por título.

------

### [GET] "/filmes/genre"

getByGenre retorna um filme por gênero.

------

### [POST] "/filmes/create"

createFilm cria um filme.

```json
{
    "id": randomico,
    "Title":"string",
    "Year":"string",
    "Rated":"string",
    "Released":"string",
    "Runtime":"string",
    "Genre":"string",
    "Director":"string",
    "Writer":"string",
    "Actors":"string",
    "Plot":"string",
    "Language":"string",
    "Country":"string",
    "Awards":"string"
}
```

------

### [PUT] "/filmes/id"

replaceFilm atualiza um filme existente.

------

### [PATCH] "/filmes/update/id"

updateAnything atualiza qualquer coisa.

------

### [DELETE] "filmes/delete/id"

deleteFilm deleta um filme por id.