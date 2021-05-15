### Filmes

[GET]"/filmes/todos"
retorna todos os filmes

[GET]"/filmes/title"
retorna um filme pelo título

[GET]"/filmes/genre"
retorna o filme pelo genêro

[GET]"/filmes/:id"
retorna um filme por id

[POST]"/filmes/create"
retorna a adição de um novo filme pelo json;

{ 
        "id": "String Randomico", 
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

[PUT]"/filmes/:id"
retorna atualizações de um filme conforme requerido

[PATCH]"/filmes/update/:id
retorna atualização de uma parte do filme conforme requerido

[DELETE]"/filmes/:id"
deleta um filme por id