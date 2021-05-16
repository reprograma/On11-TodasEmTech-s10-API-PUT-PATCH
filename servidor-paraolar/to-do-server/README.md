# DOCUMENTAÇÃO API To Do
### Rotas

[GET] "/"
getAll que retorna todas as tarefas

[GET] "/:id"
getById que retorna uma tarefa especifico

[POST] "/cadastrar"
createPost criar uma tarefa

[PUT] "/:id"
replaceToDo atualiza uma tarefa

[PATCH] "updateDescricao/:id"
updateDescricao atualizar somente a descrição da tarefa

[PATCH] "update/:id"
updateAnything atualizar qualquer parte da tarefa separadamente

[DELETE] "/:id"
deletePost deleta uma tarefa


```json
{
	    "id": randomico,
        "dataCriacao": new Date(),
        **"titulo": "string",
        "conteudo": "string",
        "etiquetas": [LISTA]**
}
```