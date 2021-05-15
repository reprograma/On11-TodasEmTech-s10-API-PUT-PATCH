const filmes = require("../models/filmes.json") //chamar nosso json
const fs = require("fs")

//GET

const getAll = (request, response)=>{ //criar função getAll
    response.status(200).send(filmes)
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

//writeFile

function fsWriteFile(){
    fs.writeFile("./src/model/filmes.json", JSON.stringify(filmes), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({message: err});
        }
    })
}

//POST

const cadastrarFilmes = (request, response) => {
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards } = request.body
    filmes.push({ 
        id :  Math.random().toString(32).substr(2,6), 
        Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards
    })

    fsWriteFile()

    response.status(201).json({
        "mensagem": "Novo Filme Adicionado",
        filmes
    })
}


//PUT

const atualizarFilmes = (request, response) => {
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
    filmes.splice(indice, 1, filmeAtualizado)

    fsWriteFile()

    response.status(200).json({
        "mensagem": "Filme Atualizado com Sucesso",
        filmeAtualizado
    })

}


//PATCH 

const patchFilmes = (request, response) => {
    const idRequerido = request.params.id
    let atualizacaoBody = request.body
    let filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    Object.keys(atualizacaoBody).forEach((chave) => {
    filmeFiltrado[chave] = atualizacaoBody[chave]
    })

    fsWriteFile()

    response.status(200).json({
        "mensagem": "Filme Atualizado com Sucesso",
        filmeFiltrado
    })
}


//DELETE
const deleteFilme = (request, response) => {
    const idRequerido = request.params.id
    const filmeFiltrado = filmes.find(filme => filme.id == idRequerido)

    if(filmeFiltrado == undefined || idRequerido == " "){
        return response.status(404).json([{
             "mensagem":"Por favor informe um ID válido"
         }])
     } 

    const indice = filmes.indexOf(filmeFiltrado)
    filmes.splice(indice, 1)

    fsWriteFile()

    response.status(200).json({
        "mensagem": "Filme Deletado com Sucesso",
        filmes
    })
}

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    cadastrarFilmes,
    atualizarFilmes,
    patchFilmes,
    deleteFilme
}