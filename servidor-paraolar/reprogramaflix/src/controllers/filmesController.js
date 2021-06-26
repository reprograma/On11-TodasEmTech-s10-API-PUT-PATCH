const filmes = require("../models/filmes.json") //chamar nosso json
const utils = require("../utils/filmesUtils")

const getAll = (request, response) => { //criar função getAll
  response.status(200).send(filmes)
}
const getById = (request, response) => {
  const idRequerido = request.params.id
  let idFiltrado = filmes.find(filme => filme.id == idRequerido)

  if (idFiltrado == undefined || idRequerido == " ") {
    response.status(404).json([{
      "mensagem": "id não existente"
    }])
  } else {
    response.status(200).json(idFiltrado)
  }
}

const getByTitle = (request, response) => {
  const titulo = request.query.titulo.toLowerCase()
  const filmeFiltrado = filmes.find(filme => filme.Title.toLowerCase().includes(titulo))

  if (titulo == "" || filmeFiltrado == undefined) {
    response.status(400).json([{
      "mensagem": "por favor, digite um titulo válido"
    }])
  } else {
    response.status(200).send(filmeFiltrado)
  }
}

const getByGenre = (request, response) => {
  const generoRequisitado = request.query.genero.toLowerCase()
  let novaLista = []

  filmes.forEach(filme => {
    let generoLista = filme.Genre.toLowerCase().split(",")

    for (genero of generoLista) {

      if (genero.includes(generoRequisitado)) {
        console.log(filme)
        novaLista.push(filme)
      }
    }
  })

  response.status(200).send(novaLista)
}

const updateTitle = (request, response) => {
  const idRequerido = request.params.id;
  const newTitle = request.body.Title;
  const filmeFiltrado = utils.filtrarFilme(filmes, idRequerido);
  
  
  filmeFiltrado.Title = newTitle;

  response.status(200).json([{
    "mensagem": "Titulo atualizado com sucesso",
    filmeFiltrado
  }]);
}

const replaceMovie = (request, response) => {
  const idRequerido = request.params.id;
  const filmeFiltrado = utils.filtrarFilme(filmes, idRequerido);
  let filmeBody = request.body;

  let filmeAtualizado = {
    id: idRequerido,
    Title: filmeBody.Title,
    Year: filmeBody.Year,
    Rated: filmeBody.Rated,
    Release: filmeBody.Release,
    Runtime: filmeBody.Runtime,
    Genre: filmeBody.Genre,
    Director: filmeBody.Director,
    Writer: filmeBody.Writer,
    Actors: filmeBody.Actors,
    Plot: filmeBody.Plot,
    Language: filmeBody.Language,
    Country: filmeBody.Country,
    Awards: filmeBody.Awards
  }

  const indice = filmes.indexOf(filmeFiltrado);
  filmes.splice(indice, 1, filmeAtualizado);

  response.status(200).json([{
    "mensagem": "Filme substituido com sucesso",
    filmeAtualizado
  }]);
}

const updateAnything = (request, response) => {
  const idRequerido = request.params.id;
  const filmeFiltrado = utils.filtrarFilme(filmes, idRequerido);
  const atualizacaoBody = request.body;

  let listaChaves = Object.keys(atualizacaoBody);
  listaChaves.forEach((chave) => {
    filmeFiltrado[chave] = atualizacaoBody[chave];
  });

  response.status(200).json([{
    "mensagem": "Filme atualizado com sucesso",
    filmeFiltrado
  }]);
}

const deleteMovie = (request, response) => {
  const idRequerido = request.params.id;
  const filmeFiltrado = utils.filtrarFilme(filmes, idRequerido);

  const indice = filmes.indexOf(filmeFiltrado);
  filmes.splice(indice, 1);

  response.status(200).json([{
    "mensagem": "Filme deletado",
    filmes
  }]);
}

module.exports = { //exportando as funções
  getAll,
  getById,
  getByTitle,
  getByGenre,
  updateTitle,
  replaceMovie,
  updateAnything,
  deleteMovie
}