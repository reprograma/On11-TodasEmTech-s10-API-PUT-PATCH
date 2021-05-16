let filtrarFilme = (model, id)=>{
    let filmeFiltrado = model.find(filmes => filmes.id == id)
    return filmeFiltrado
}

module.exports ={
    filtrarFilme
}