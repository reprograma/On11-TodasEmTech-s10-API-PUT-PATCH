[GET] "/posts" 
getAll que retorna todos os posts 
[GET] "/posts/:id" 
getById que retorna um post especifico 

[DELETE] "/posts/:id" deletePost deleta um post 

[POST] "/posts/create" 
createPost criar publicação 
  json 
    { 
      "id": randomico, 
      "dataCriacao": new Date(), 
      "titulo": "string", 
      "conteudo": "string", 
      "etiquetas": [LISTA]
      } 

[PUT] "posts/:id" 
replacePost atualiza postagem/publicação 

[PATCH] "posts/updateTitle/:id" 
updateTitle atualizar somente o titulo da postagem 
[PATCH] "/posts/update/:id" 
updateAnything atualizar qualquer parte do post separadamente 