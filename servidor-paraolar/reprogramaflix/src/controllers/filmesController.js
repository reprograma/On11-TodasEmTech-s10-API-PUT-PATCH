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


//POST
const createFilme = (request, response)=>{
    const newFilme = {
        id: Math.random().toString(32).substr(2,6),
        Title: request.body.Title ,
        Year: request.body.Year,
        Rated: request.body.Rated,
        Released: new Date(),
        Runtime: request.body.Runtime,
        Genre: request.body.Genre,
        Director: request.body.Director ,
        Writer: request.body.Writer,
        Actors: request.body.Actors,
        Plot: request.body.Plot,
        Language: request.body.Language,
        Country: request.body.Country,
        Awards: request.body.Awards
    }

    filmes.push(newFilme)
    response.status(200).json(newFilme)
}

//PUT
const replaceFilme = (request,response)=>{
    const idRequerido = request.params.id
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    const filmeAtualizado ={
        id: filmeFiltrado.id,
        Title: request.body.Title ,
        Year: request.body.Year,
        Rated: request.body.Rated,
        Released: request.body.Released,
        Runtime: request.body.Runtime,
        Genre: request.body.Genre,
        Director: request.body.Director ,
        Writer: request.body.Writer,
        Actors: request.body.Actors,
        Plot: request.body.Plot,
        Language: request.body.Language,
        Country: request.body.Country,
        Awards: request.body.Awards
    }

    const indice = filmes.indexOf(filmeFiltrado)
    filmes.splice(indice, 1,filmeAtualizado)

    response.status(200).json([{
        "mensagem":"filme atualizado",
       filmeAtualizado
    }])
}

//PATCH
const updateFilme = (request, response)=>{
    const idRequerido = request.params.id
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    let listaChaves = Object.keys(request.body)

    listaChaves.forEach((chave)=>{
        filmeFiltrado[chave] =request.body[chave]
    })

    response.status(200).json([{
        "mensagem":"post atualizado",
        filmeFiltrado
    }])
}

//DELETE
const deleteFilmes = (request, response)=>{
    const idRequerido = request.params.id
    let idFiltrado = filmes.find(filme => filme.id == idRequerido)

    const indice = filmes.indexOf(idFiltrado)

    filmes.splice(indice,1)

    response.status(200).json([{
        "mensagem":"Filme deletado",
        filmes
    }])
}

module.exports = { 
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createFilme,
    replaceFilme,
    updateFilme,
    deleteFilmes
}