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

const createMovie = (request, response) => {
    let newMovie = {
        id: Math.random().toString(32).substr(2,6),
        Title: request.body.Title,
        Year: request.body.Year,
        Rated: request.body.Rated,
        Released: request.body.Released,
        Runtime: request.body.Runtime,
        Genre: request.body.Genre,
        Director: request.body.Director,
        Writer: request.body.Writer,
        Actors: request.body.Actors,
        Plot: request.body.Plot,
        Language: request.body.Language,
        Country: request.body.Country,
        Awards: request.body.Awards
    }

    filmes.push(newMovie);

    response.status(201).json ([{
        "mensagem": "Filme adcionado com sucesso",
        filmes
    }])
}

const replaceMovie = (request, response) => {
    const id = request.params.id;
    let filmeAtualizado = request.body;
    const filmeFiltrado = filmes.find(filme => filme.id == id);

    const indice = filmes.indexOf(filmeFiltrado);

    filmeAtualizado.id = id;
    filmes.splice(indice, 1, filmeAtualizado);

    response.status(200).json ([{
        "mensagem": "Filme atualizado com sucesso", 
        filmeAtualizado
    }])
}

const updateTitle = (request, response) => {
    const id = request.params.id;
    let newTitle = request.body.title;

    const filmeFiltrado = filmes.find(filme => filme.id == id);

    filmeFiltrado.title = newTitle;

    response.status(200).json ([{
        "mensagem": "Título atualizado com sucesso"
    }])
}

const updateAnything = (request, response) => {
    const id = request.params.id;
    const atualizacaoBody = request.body;

    const filmeFiltrado = filmes.find(filme => filme.id  == id)

    Object.keys(atualizacaoBody).forEach((key) => {
        filmeFiltrado[key] = atualizacaoBody[key]
    })

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        filmeFiltrado
    }])
}

const deleteMovie = (request, response) => {
    const id = request.params.id;
    const filmeFiltrado = filmes.find(filme => filme.id == id);

    const indice = filmes.indexOf(filmeFiltrado);
    filmes.splice(indice, 1);

    response.status(200).json ([{
        "mensagem": "Filme deletado com sucesso",
        filmes 
    }])
}

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie,
    replaceMovie,
    updateTitle,
    updateAnything,
    deleteMovie
}