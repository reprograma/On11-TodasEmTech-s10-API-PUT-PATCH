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

const creatFilmes = (request, response) => {
    let titleRequerido = request.body.Title
    let yearRequerido = request.body.Year
    let ratedRequerido = request.body.Rated
    let releasedRequerido = request.body.Released
    let runtimeRequerido = request.body.Runtime
    let genreRequerido = request.body.Genre
    let directorRequerido = request.body.Director
    let writerRequerido = request.body.Writer
    let actorsRequerido = request.body.Actors
    let plotRequerido = request.body.Plot
    let languageRequerido = request.body.Language
    let countryRequerido = request.body.Country
    let awardsRequerido = request.body.Awards

    let newFilms = {
        id: Math.random().toString(32).substr(2, 6),
        Title: titleRequerido,
        Year: yearRequerido,
        Rated: ratedRequerido,
        Released: releasedRequerido,
        Runtime: runtimeRequerido,
        Genre: genreRequerido,
        Director: directorRequerido,
        Writer: writerRequerido,
        Actors: actorsRequerido,
        Plot: plotRequerido,
        Language: languageRequerido,
        Country: countryRequerido,
        Awards: awardsRequerido
    }

    filmes.push(newFilms)

    response.status(201).json([{
        "mensagem": "Filme criado",
        newFilms
    }])
}

const replaceFilme = (request, response) => {
    const idRequerido = request.params.id
    let filmeBody = request.body
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

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
        Actors: filmeBody.Actors,
        Plot: filmeBody.Plot,
        Language: filmeBody.Language,
        Country: filmeBody.Country,
        Awards: filmeBody.Awards
    }

    const indice = filmes.indexOf(filmeFiltrado)
    filmes.splice(indice, 1, filmeAtualizado)

    response.status(200).json([{
        "mensagem": "Filme substituído com sucesso",
        filmeAtualizado
    }])
}

const updateTitle = (request, response) => {
    const idRequerido = request.params.id
    let newTitle = request.body.titulo
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    filmeFiltrado.titulo = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado",
        filmeFiltrado
    }])
}

const updateAnything = (request, response) => {
    const idRequerido = request.params.id
    const atualizarBody = request.body
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    let listaChaves = Object.keys(atualizarBody)

    listaChaves.forEach((chave) => {
        filmeFiltrado[chave] = atualizarBody[chave]
    })

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        filmeFiltrado
    }])
}

const deleteFilme = (request, response) => {
    const idRequerido = request.params.id
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    const indice = filmes.indexOf(filmeFiltrado)
    filmes.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Filme deletado",
        filmes
    }])
}




module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    creatFilmes,
    replaceFilme,
    updateTitle,
    updateAnything,
    deleteFilme
}