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

const createFilm = (request, response) =>{
   const newFilm = request.body.Title
   const newYear = request.body.Year 

   const novoFilme = {
      id: Math.random().toString(32).substr(2,6),
      Title: newFilm,
      Year: newYear,
   }

   response.status(200).send(novoFilme)
}

const replaceFilms = (request, response)=>{
   const id = request.params.id
   let filmAtualizado = request.body
   const filmesFiltrados = filmes.find(filme => filme.id == id)
   const indice = filmes.indexOf(filmesFiltrados)

   filmAtualizado.id = id

   filmes.splice(indice, 1, filmAtualizado)

   response.status(200).json([{
      "mensagem": "Filme substituido!",
      filmAtualizado
   }])
}

const updateTitle = (request, response)=>{
   const id = request.params.id
   let newTitle = request.body.Title
   const filmesFiltrados = filmes.find(filme => filme.id == id)

   filmesFiltrados.Title = newTitle

   response.status(200).json([{
      "mensagem": "Filme atualizado!",
      filmesFiltrados
   }])
}

const deleteFilm = (request, response)=>{
   const id = request.params.id
   const filmesFiltrados = filmes.find(filme => filme.id == id)

   const indice = filmes.indexOf(filmesFiltrados)

   filmes.splice(indice, 1)

   response.status(200).json([{
      "mensagem": "Post deletado",
      filmes
   }])
}

module.exports = { //exportando as funções
   getAll,
   getById,
   getByTitle,
   getByGenre,
   createFilm,
   replaceFilms,
   updateTitle,
   deleteFilm
}