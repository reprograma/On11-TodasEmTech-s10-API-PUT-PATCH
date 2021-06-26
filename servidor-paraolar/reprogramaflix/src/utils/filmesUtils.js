let filtrarFilme = (model, id) => {
  let filmeFiltrado = model.find(filme => filme.id == id)
  return filmeFiltrado
}

module.exports = {
  filtrarFilme
}