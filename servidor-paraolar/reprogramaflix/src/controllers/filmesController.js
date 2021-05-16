const filmesJson = require("../models/filmes.json") //chamar nosso json

// Retorna todos os filmes
const getAll = (request, response)=>{
    response.status(200).send(filmesJson)
}

// Retorna um filme por id
const getById = (request, response)=>{
    const idRequerido = request.params.id
    let idFiltrado = filmesJson.find(filme => filme.id == idRequerido)

    if(idFiltrado == undefined || idRequerido == " "){
        response.status(404).json([{
            "mensagem":"id não existente"
        }])
    }else{
        response.status(200).json(idFiltrado)       
    }   
}

// Retorna um filme por título
const getByTitle = (request, response)=>{
    const titulo = request.query.titulo.toLowerCase()
    const filmeFiltrado = filmesJson.find(filme => filme.Title.toLowerCase().includes(titulo))

    if(titulo == "" || filmeFiltrado == undefined){
        response.status(400).json([{
            "mensagem":"por favor, digite um titulo válido"
        }])
    } else {
        response.status(200).send(filmeFiltrado)
    }
}

// Retorna um filme por gênero
const getByGenre = (request, response)=>{
    const generoRequisitado = request.query.genero.toLowerCase()
    
    let novaLista =[]
   
    filmesJson.forEach(filme =>{
        let generoLista = filme.Genre.split(",") 

        for(genero of generoLista){
            if(genero.toLowerCase().includes(generoRequisitado)){
                // console.log(filme)
                novaLista.push(filme)
            }
        }
    })

    response.status(200).send(novaLista)
}

// Cria um filme
const createFilm = (request, response)=>{
    let tituloRequerido = request.body.Title
    let anoRequerido = request.body.Year
    let avaliacaoRequerida = request.body.Rated
    let liberacaoRequerida = request.body.Released
    let duracaoRequerida = request.body.Runtime
    let generoRequerido = request.body.Genre
    let diretorRequerido = request.body.Director
    let escritorRequerido = request.body.Writer
    let atoresRequerido = request.body.Actors
    let tramaRequerido = request.body.Plot
    let linguagemRequerida = request.body.Language
    let paisRequerido = request.body.Country
    let premiosRequerido = request.body.Awards

    // Criando um novo filme
    const newFilm = {
        id: Math.random().toString(32).substr(2,6),
        Title: tituloRequerido,
        Year: anoRequerido,
        Rated: avaliacaoRequerida,
        Released: liberacaoRequerida,
        Runtime: duracaoRequerida,
        Genre: generoRequerido,
        Director: diretorRequerido,
        Writer: escritorRequerido,
        Actors: atoresRequerido,
        Plot: tramaRequerido,
        Language: linguagemRequerida,
        Country: paisRequerido,
        Awards: premiosRequerido
    }

    // Adicionando o novo filme ao json
    filmesJson.push(newFilm)

    response.status(201).json([{
        "mensagem": "Filme criado com sucesso",
        newFilm
    }])
}

// Atualiza um filme existente
const replaceFilm = (request, response)=>{
    const idRequerido = request.params.id
    const filmeBody = request.body
    const filmeFiltrado = filmesJson.find(filme => filme.id == idRequerido)
    
    const filmeAtualizado = {
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

    const indice = filmesJson.indexOf(filmeFiltrado)
    filmesJson.splice(indice, 1, filmeAtualizado)

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        filmeAtualizado
    }])
}

// Atualiza qualquer coisa
const updateAnything = (request, response)=>{
    const idRequerido = request.params.id
    const atualizaBody = request.body
    const filmeFiltrado = filmesJson.find(filme => filme.id == idRequerido)

    const listaChaves = Object.keys(atualizaBody)
    
    listaChaves.forEach((chave) => {
        filmeFiltrado[chave] = atualizaBody[chave]
    })

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        filmeFiltrado
    }])
}

// Deleta um filme por id
const deleteFilm = (request, response)=>{
    const idRequerido = request.params.id
    const filmeFiltrado = filmesJson.find(filme => filme.id == idRequerido)
    const indice = filmesJson.indexOf(filmeFiltrado)

    filmesJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Filme deletado com sucesso",
        filmesJson
    }])

}

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createFilm,
    replaceFilm,
    updateAnything,
    deleteFilm
}