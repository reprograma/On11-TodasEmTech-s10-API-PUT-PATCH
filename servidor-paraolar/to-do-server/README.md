### Tarefas

[GET]"/"
retorna a apresentação do projeto

[GET]"/tarefas"
retorna todas as tarefas

[GET]"/tarefas/:id"
retorna uma tarefa pelo ID

[POST]"/tarefas/cadastrar"
retorna o cadastro de uma nova tarefa através do json
{
    "id": "String Randomico",
    "dataInclusao": new Date(),
    "concluido": booleano,
    "descricao": "String",
    "nomeColaborador": "String"
}

[PUT]"/tarefas/:id"
retorna a atualização da tarefa, com a mudança do status "concluido", e sua "descricao". com o json;

{
    "concluido": booleano,
    "descricao": "string",
}

[PATCH]"/tarefas/update/:id"
retorna a atualização de uma parte da tarefa comforme requerido.

[DELETE]"/tarefas/:id"
deleta uma tarefa por id