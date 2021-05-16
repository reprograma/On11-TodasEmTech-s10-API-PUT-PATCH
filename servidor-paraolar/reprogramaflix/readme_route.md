[GET] "/filmes" getAll que retorna todos os filmes  
[GET] "/filmes/:id" getById que retorna um filme especifico  
[PUT] "filmes/:id" replaceFilme atualiza lista de filmes  
[PATCH] "filmes/updateTitle/:id" updateTitle atualizar somente o titulo do filme
[PATCH] "/filmes/update/:id"updateAnything atualizar qualquer parte do filme separadamente
[POST] "/filmes/create" createFilme criar filme
[DELETE] "/filmes/:id" deleteFilme deleta um filme