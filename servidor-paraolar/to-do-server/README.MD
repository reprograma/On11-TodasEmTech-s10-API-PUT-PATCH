PROJETO NAYARA - TO DO SERVER

#[GET] **"/"** -- _index_ -- retorna a presentação do projeto;

#[GET] **"/taferas"** -- _getAll_ retorna todas as tarefas;

#[GET] **"/tarefas/:id"** -- _getById_ -- retorna um tarefa específica por ID;

#[POST] **"/tarefas/cadastrar"** -- _createTask_ cadastra uma nova tarefa;

#O deve retornar:
```
{
    "id": "ID randômico",
    "dataInclusao": "data (new Data)",
    "concluido": booleano,
    "descricao": "string",
    "nomeColaborador": "string (nome)"
  }
```

#[PUT] **"/tarefas/:id"** -- _replaceTask_ -- atualiza uma tarefa (concluido, descricao e nomeColaborador);

#[PATCH] **"/tarefas/updateName/:id"** -- _updateName_ -- atualiza somente o nome do colaborador;

#[PATCH] **"/tarefas/update/:id"** -- _updateAnything_ -- atualiza qualquer parte da tarefa separadamente;

#[DELETE] **"/tarefas/:id"** -- _deleteTask_ -- deleta uma tarefa.
