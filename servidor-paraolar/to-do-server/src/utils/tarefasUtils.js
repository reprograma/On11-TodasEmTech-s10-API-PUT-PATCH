let filtrarTarefa = (model, id)=>{
    let tarefaFiltrada = model.find(tarefa => tarefa.id == id)
    return tarefaFiltrada
}

module.exports ={
    filtrarTarefa
}