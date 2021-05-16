const { request, response } = require("express")
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

const createFilme = (request, response)=>{
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Language, Country, Awards} = request.body
    filmes.push({
        id: Math.random().toString(32).substr(2,6),
        Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Language, Country, Awards
    })

    response.status(200).json([{
        "Mensagem":"Novo filme adicionado com sucesso!",
        filmes
    }])
}

const replaceFilme = (request, response)=>{
    const idRequerido = request.params.id
    let filmeBody = request.body
    let filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    let filmeAtualizado = {
        id: filmeFiltrado.id,
        Title: filmeFiltrado.Title,
        Year: filmeFiltrado.Year,
        Rated: filmeBody.Rated,
        Released: filmeFiltrado.Released,
        Runtime: filmeFiltrado.Runtime,
        Genre: filmeBody.Genre,
        Director: filmeFiltrado.Director,
        Writer: filmeFiltrado.Writer,
        Actors: filmeFiltrado.Actors,
        Plot: filmeFiltrado.Plot,
        Language: filmeBody.Language,
        Country: filmeFiltrado.Country,
        Awards: filmeFiltrado.Awards
    }

    const indice = filmes.indexOf(filmeFiltrado)
    filme.splice(indice, 1, filmeAtualizado)

    response.status(200).json([{
        "Mensagem":"Filme substituido com sucesso!",
        filmeAtualizado
    }])
}

const updateAnything = (request, response) =>{
    const idRequerido = request.params.id
    const atualizacaoBody = request.body
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    let listaDeChave = Object.keys(atualizacaoBody)

    listaDeChave.forEach((chave)=>{
        filmeFiltrado[chave] = atualizacaoBody[chave]
    })

    response.status(200).json([{
        "Mensagem":"Filme atualizado com sucesso!",
        filmeFiltrado
    }])
}

const deleteFilme = (request, response) =>{
    const idRequerido = request.params.id
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    const indice = filmes.indexOf(filmeFiltrado)

    filmes.splice(indice, 1)

    response.status(200).json([{
        "Mensagem":"Filme deletado com sucesso!",
        filmes
    }])
}

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createFilme,
    replaceFilme, 
    updateAnything,
    deleteFilme
}