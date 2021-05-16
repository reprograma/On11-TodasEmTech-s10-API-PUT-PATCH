const filmes = require("../models/filmes.json") //chamar nosso json

const getAll = (request, response)=>{ //criar função getAll
    response.status(200).send(filmes)
}

const getById = (request, response)=>{
    const idRequerido = request.params.id
    let idFiltrado = filmes.find(filme => filme.id == idRequerido)

    if(idFiltrado == undefined || idRequerido == " "){
        response.status(404).json([{
            "mensagem":"id não existente"
        }])
    }else{
        response.status(200).json(idFiltrado)       
    }   
}

const getByTitle = (request, response)=>{
    const titulo = request.query.titulo.toLowerCase()
    const filmeFiltrado = filmes.find(filme => filme.Title.toLowerCase().includes(titulo))

    if(titulo == "" || filmeFiltrado == undefined){
        response.status(400).json([{
            "mensagem":"por favor, digite um titulo válido"
        }])
    } else {
        response.status(200).send(filmeFiltrado)
    }
}

const getByGenre = (request, response)=>{
    const generoRequisitado = request.query.genero
    let novaLista =[]
   
    filmes.forEach(filme =>{
        let generoLista = filme.Genre.split(",") 

        for(genero of generoLista){
            
            if(genero.includes(generoRequisitado)){
                console.log(filme)
                novaLista.push(filme)
            }
        }
    })

    response.status(200).send(novaLista)
}

const createMovie = (req, res) => {
  const {Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards} = req.body
  let newMovie = {
    id: Math.random().toString(32).substr(2,6),
    Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards
  }
  filmes.push(newMovie)
  res.status(201).json([{
    "message": "Filmes adicionado",
    newMovie
  }])
}

const replaceMovie = (req, res) => {
  const id = req.params.id
  const {Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards} = req.body
  const movie = filmes.find(i => i.id == id)
  const index = filmes.indexOf(movie)

  let updateMovie = {
    id: id,
    Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards
  }
  filmes.splice(index, 1, updateMovie)

  res.status(200).json([{
    "message": "Filme atualizado!",
    updateMovie
  }])
}

const updateAnything = (req, res) => {
  const id = req.params.id
  const bodyRequest = req.body
  const movie = filmes.find(i => i.id == id)
  
  Object.keys(bodyRequest).forEach(key => {
    movie[key] = bodyRequest[key]
  })

  res.status(200).json([{
    "message": "titulo atualizado!",
    movie
  }])
}

const deleteMovie = (req, res) => {
  const id = req.params.id
  const movie = filmes.find(i => i.id == id)
  filmes.splice(movie, 1)
  res.status(200).json([{
    "message": "Filme removido",
    filmes
  }])
} //eu fiz testando não usar o indexOf, deu certo, se houver algum erro pfvr me fala!

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie,
    replaceMovie,
    updateAnything,
    deleteMovie
}