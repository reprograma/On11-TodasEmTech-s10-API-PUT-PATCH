# 📂 DOCUMENTAÇÃO

## Rotas
### [GET] **"/posts"** -- _getAll_ -- retorna todos os posts;

### [GET] **"/posts/:id"** -- _getById_ -- retorna um post específico;

### [POST] **"/posts/create"** -- _createPost_ -- cria uma nova publicação;

### O deve ser retornado:
```
{
        "id": ID randômico,
        "dataCriacao": data (new Data),
        "titulo": string ,
        "conteudo": string,
        "etiquetas": [lista de string]
}
```

### [PUT] **"/posts/:id"** -- _replacePost_ -- atualiza a postagem;

### [PATCH] **"/posts/updateTitle/:id"** -- _updateTitle_ -- atualiza somente o title da postagem;

### [PATCH] **"/posts/update/:id"** -- _updateAnything_ -- atualiza qualquer parte do post separadamente;

### [DELETE] **"/posts/:id"** -- _deletePost_ -- deleta um post. 
