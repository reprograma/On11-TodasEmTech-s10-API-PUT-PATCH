const filmes = require("../models/filmes.json") //chamar nosso json

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
    const generoRequisitado = request.query.genero
    let novaLista = []

    filmes.forEach(filme => {
        let generoLista = filme.Genre.split(",")

        for (genero of generoLista) {

            if (genero.includes(generoRequisitado)) {
                console.log(filme)
                novaLista.push(filme)
            }
        }
    })

    response.status(200).send(novaLista)
}


const createMovie = (request, response) => {
    let tituloRequerido = request.body.Title
    let anoRequerido = request.body.Year
    let classificacaoRequerida = request.body.Rated
    let anoLancamentoRequerido = request.body.Released
    let duracaoRequerida = request.body.Runtime
    let generoRequerido = request.body.Genre
    let direcaoRequerida = request.body.Director
    let autoriaRequerida = request.body.Writer
    let atoresRequeridos = request.body.Actors
    let roteiroRequerido = request.body.Plot
    let idiomasRequerido = request.body.Language
    let paisRequerido = request.body.Country
    let PremiosRequeridos = request.body.Awards

    let newMovie = {
        "id": Math.random().toString(32).substr(2, 4),
        "Title": tituloRequerido,
        "Year": anoRequerido,
        "Rated": classificacaoRequerida,
        "Released": anoLancamentoRequerido,
        "Runtime": duracaoRequerida,
        "Genre": generoRequerido,
        "Director": direcaoRequerida,
        "Writer": autoriaRequerida,
        "Actors": atoresRequeridos,
        "Plot": roteiroRequerido,
        "Language": idiomasRequerido,
        "Country": paisRequerido,
        "Awards": PremiosRequeridos
    }
    moviesJson.push(newMovie)
    response.status(201).json([{
        "mensagem": "Filme criado",
        newMovie
    }])
}

const replaceMovie = (request, response) => {
    const idRequerido = request.params.id
    let movieAtualizado = request.body
    const movieFiltrado = moviesJson.find(movie => movie.id == idRequerido)
    const indice = moviesJson.indexOf(movieFiltrado)

    movieAtualizado.id = idRequerido
    movieAtualizado.Year = movieAtualizado.Year

    moviesJson.splice(indice, 1, movieAtualizado)

    response.status(200).json([{
        "mensagem": "Filme substituido com suscesso",
        movieAtualizado
    }])
}

const updateTitle = (request, response) => {
    const idRequerido = request.params.id
    let newTitle = request.body.Title
    const movieFiltrado = moviesJson.find(movie => movie.id == idRequerido)

    movieFiltrado.tituloRequerido = newTitle

    response.status(200).json([{
        "mensagem": "O titulo do filme foi atualizado com sucesso",
        movieFiltrado
    }])
}

const updateAnything = (request, response) => {
    const idRequerido = request.params.id
    let atualizacaoBody = request.body
    const movieFiltrado = moviesJson.find(movie => movie.id == idRequerido)

    Object.keys(atualizacaoBody).forEach((chave) => {
        movieFiltrado[chave] = atualizacaoBody[chave]
    })


    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        movieFiltrado
    }])
}

const deleteMovie = (request, response) => {
    const idRequerido = request.params.id
    const movieFiltrado = moviesJson.find(movie => movie.id == idRequerido)

    const indice = moviesJson.indexOf(movieFiltrado)
    moviesJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Filme deletado",
        moviesJson
    }])
}

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie, //novo
    replaceMovie, //novo
    updateTitle, //novo
    updateAnything, //novo
    deleteMovie //novo
}