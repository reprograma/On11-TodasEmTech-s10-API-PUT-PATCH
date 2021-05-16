# ReprogramaFix

Por Jane Beatriz -   Versão 1.0.0 - metodo: http

### APRESENTAÇÃO DA API

 {

"Id"  : gerado automaticamente pelo servidor

"Title":"10 Things I Hate About You",

"Year":"1999",

"Rated":"PG-13",

"Released":"31 Mar 1999",

"Runtime":"97 min",

"Genre":"Comedy, Drama, Romance",   

"Director":"Gil Junger",

"Writer":"Karen McCullah, Kirsten Smith",

"Actors":"Heath Ledger, Julia Stiles, Joseph Gordon-Levitt, Larisa Oleynik",

"Plot":"A pretty, popular teenager can't go out on a date until her ill-tempered older sister does.",

"Language":"English, French",

"Country":"USA",

"Awards":"2 wins & 13 nominations."

}

## ROTAS:  http:dominio

# [GET]/filmes/todos

retorna todos os filmes

# [GET]/filmes/title

## requirido : query parametros

### [KEY] titulo  [VALUE] titulo a ser buscado

Informações adiconais:

[KEY] case-sensitive

[VALUE] case-não-sensitive , por usar o metodo includes, pode requisitar busca via atalhos.

ex:  /filmes/title?titulo=harry

retorna um filme por vez

# [GET]/filmes/genre

### requirido: query parametros

### [KEY] genero  [VALUE] genero a ser buscado

Informações adiconais:

[KEY] case-sensitive

[VALUE] case-não-sensitive , por usar o metodo includes, pode requisitar busca via atalhos.

ex:  /filmes/genre?genero=Sci

retorna um array de todos os filmes que o genero inclua [ Sci ]

# [GET]/filmes/{id}

### requirido: path parametros

Informações adiconais:

ex:  /filmes/1

retorna  o flme cujo o id seja 1

# [POST]/filmes/create

### requirido:  body parser

### JSON EXEMPLO CHAVES REQUIRIDAS

 {

"Id"  : gerado automaticamente pelo servidor

"Title":"10 Things I Hate About You",

"Year":"1999",

"Rated":"PG-13",

"Released":"31 Mar 1999",

"Runtime":"97 min",

"Genre":"Comedy, Drama, Romance",   

"Director":"Gil Junger",

"Writer":"Karen McCullah, Kirsten Smith",

"Actors":"Heath Ledger, Julia Stiles, Joseph Gordon-Levitt, Larisa Oleynik",

"Plot":"A pretty, popular teenager can't go out on a date until her ill-tempered older sister does.",

"Language":"English, French",

"Country":"USA",

"Awards":"2 wins & 13 nominations."

}

### Atenção as chaves: *Genre, Write, Actors, Language*

A lista é separada pela virgula

# [PUT]/filmes/{id}

### requirido:  body parser

### JSON EXEMPLO

 {

"Id"  : não pode ser alterado

"Title":"10 Things I Hate About You",

"Year":"1999",

"Genre":"Comedy, Drama, Romance",   

"Writer":"Karen McCullah, Kirsten Smith",

"Actors":"Heath Ledger, Julia Stiles, Joseph Gordon-Levitt, Larisa Oleynik",

"Language":"English, French",

}

### Atenção aos chaves: *Genre, Write, Actors, Language*

A lista é separada pela virgula

### Informações Adicionais:

O metodo [PUT] aceita uma ou mais chaves a serem modificadas via Body Parser  { JSON }

não é possivel alterar um valor de uma lista separado, ex: Genre




# [PATCH]/filmes/{id}

### requirido:  body parser

### JSON EXEMPLO

 {

"Id"  : não pode ser alterado

"Title":"10 Things I Hate About You",

"Year":"1999",

"Genre":"Comedy, Drama, Romance",   

"Writer":"Karen McCullah, Kirsten Smith",

"Actors":"Heath Ledger, Julia Stiles, Joseph Gordon-Levitt, Larisa Oleynik",

"Language":"English, French",

}

### Atenção aos chaves: *Genre, Write, Actors, Language*

A lista é separada pela virgula

### Informações Adicionais:

O metodo [PATCH] aceita uma ou mais chaves a serem modificadas via Body Parser  { JSON }

não é possivel alterar um valor de uma lista separado, ex: Genre




# [PATCH]/filmes/update/title

### requirido: query params 
### [KEY] titulo  [VALUE] string
### so aceita uma chave Title e modifica o titulo
ex: /filmes/update/title?titulo=10 Things I Hate About You

json {
    "Title" : "novo titulo"
}






# [DELETE]/filmes/{id}

### requirido: path parametros

Informações adiconais:

ex:  /filmes/1

deleta o id requirido