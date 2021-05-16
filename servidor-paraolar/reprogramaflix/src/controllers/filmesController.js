//const { request } = require("express")
const filmes = require("../models/filmes.json") //chamar nosso json
const fs = require("fs")
const utils = require("../utils/filmesUtils")

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

const createTask = (request, response)=>{
    const filmeRequerido = request.body.Title
    const yearRequerido = request.body.Year
    const ratedRequerido = request.body.Rated
    const releasedRequerido = request.body.Released
    const runtimeRequerido = request.body.Runtime
    const genreRequesitado = request.body.Genre
    const directorRequerido = request.body.Director
    const writerRequerido = request.body.Writer
    const actorsRequerido = request.body.Actors
    const plotRequerido = request.body.Plot
    const languageRequerido = request.body.Language
    const countryRequerido = request.body.Country
    const awardsRequerido = request.body.Awards

    const novoFilme ={
        id: Math.random().toString(32).substr(2,9),
        Title: filmeRequerido,
        Year: yearRequerido,
        Rated: ratedRequerido,
        Released: releasedRequerido,
        Runtime: runtimeRequerido,
        Genre: genreRequesitado,
        Director: directorRequerido,
        Writer: writerRequerido,
        Actor: actorsRequerido,
        Plot: plotRequerido,
        Language: languageRequerido,
        Country: countryRequerido,
        Awards: awardsRequerido
    }
    filmes.push(novoFilme)

    fs.writeFile("./src/models/filmes.json", JSON.stringify(filmes), 'utf8', function(err){
        if(err) {
            return response.status(424).send({message: err})
        }
    })

    response.status(200).send(novoFilme)
}

const replaceFilme = (request, response)=>{
    const idRequerido = request.params.id
    let filmeBody = request.body
    
    const filmeFiltrado =  utils.filtrarFilme(filmes, idRequerido)
    
    let filmeAtualizado = {
        id: filmeFiltrado.id,
        Title: filmeBody.Title,
        Year: filmeBody.Year,
        Rated: filmeBody.Rated,
        Released: filmeBody.Released,
        Runtime: filmeBody.Runtime,
        Genre: filmeBody.Genre,
        Director: filmeBody.Director,
        Writer: filmeBody.Writer,
        Actor: filmeBody.Actor,
        Plot: filmeBody.Plot,
        Language: filmeBody.Language,
        Country: filmeBody.Country,
        Awards: filmeBody.Award

    }

    const indice = filmes.indexOf(filmeFiltrado)
    filmes.splice(indice, 0, filmeAtualizado)

    response.status(200).json([{
        "mensagem": "Filme substituido com sucesso!",
        filmeAtualizado
    }])

   filmes.push(filmeAtualizado)

    fs.writeFile("./src/models/filmes.json", JSON.stringify(filmes), 'utf8', function(err){
        if(err) {
            return response.status(424).send({message: err})
        }
    })

}
    
const updateGenre = (request, response)=>{
        const idRequerido = request.params.id
        let newGenre = request.body.Genre
        const filmeFiltrado = utils.filtrarFilme(filmes, idRequerido)

        filmeFiltrado.Genre = newGenre

        response.status(200).json([{
            "mensagem": "Genero atualizado com sucesso!",
            filmeFiltrado
        }])
}

const deleteFilme = (request, response)=>{
    const idRequerido = request.params.id
    const filmeFiltrado = utils.filtrarFilme(filmes, idRequerido)

    const indice = filmes.indexOf(filmeFiltrado)

    filmes.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Filme deletado com sucesso!",
        filmes
    }])
}



module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createTask,
    replaceFilme,
    updateGenre,
    deleteFilme
}