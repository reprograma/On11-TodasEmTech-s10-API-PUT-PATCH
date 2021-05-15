const filmes = require("../models/filmes.json")
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

const createTask = (request, response) =>{
    const tituloCadastrado = request.body.Title
    const anoLancamento = request.body.Year
    const tempoFilme = request.body.Runtime
    const generoFilme = request.body.Genre
    const diretorFilme = request.body.Director
    const idioma = request.body.Language
    const paisFilme = request.body.Country

    const novaTarefa ={
        id: Math.random().toString(32).substr(2,9),
        Title: tituloCadastrado,
        Year: anoLancamento,
        Runtime: tempoFilme,
        Genre: generoFilme,
        Director: diretorFilme,
        Language: idioma,
        Country: paisFilme
        
    }   

    filmes.push(novaTarefa)

    response.status(200).send(novaTarefa)

}

const replacePost = (request, response) =>{
    const idRequerido = request.params.id
    let postBody = request.body

    const postFiltrado = utils.filtrarPost(filmes,idRequerido)

    let postAtualizado = {
        id: postFiltrado.id,
        Title: postBody.Title,
        Year: postBody.Year,
        Runtime: postBody.Runtime,
        Genre: postBody.Genre,
        Director: postBody.Director,
        Language: postBody.Language,
        Country: postBody.Country
    }

    const indice = filmes.indexOf(postFiltrado)
    filmes.splice(indice, 1, postAtualizado)

    response.status(200).json([{
        "mensagem": "Post substituido com sucesso",
        postAtualizado
    }])
}

const updateTitle = (request, response) =>{
    const idRequerido = request.params.id
    let newTitle = request.body.Title
    const postFiltrado = utils.filtrarPost(filmes,idRequerido)

    postFiltrado.Title = request.body.Title

    response.status(200).json([{
        "mensagem": "Nome do filme atualizado com sucesso",
        postFiltrado
    }])
}

const deleteTask = (request, response)=>{
    const idRequerido = request.params.id
    const postFiltrado = utils.filtrarPost(filmes,idRequerido)
    
    const indice = filmes.indexOf(postFiltrado)
    filmes.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        filmes
    }])

}


module.exports = { 
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createTask,
    replacePost,
    updateTitle,
    deleteTask
}