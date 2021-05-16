const { response } = require("../app")
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

const createFilme= (request, response)=>{
    let titleRequerido = request.body.title
    let genreRequerido = request.body.genre
    let idRequeridas =request.body.id
 

let newFilme={
    titulo: titleRequerido,
    genero: genreRequerido,
    id: idRequeridas
    }

    filmesJson.push(newFilme)

    response.status(201).json([{
        "mensagem": "Filme criado da tarefa",
        newFilme
    }])
}

const replaceFilme = (request, response)=>{
    const idRequerido = request.params.id
    let filmeAtualizado = request.body
    const filmeFiltrado = filmesJson.find(filme=>filme.id ==idRequerido)
    const indice = filmesJson.indexOF(filmeFiltrado)

    console.log(filmeAtualizado)
    filmeAtualizado

    filmesJson.splice(indice,1,filmeAtualizado)

    response.status(200).json([{
        "mensagem" : "Filme atualizado com sucesso",
        filmeAtualizado
    }])
}

const updateTitle = (request, response)=>{
    const idRequerido = request.params.id
    let newTitle = request.body.title
    const filmeFiltrado = filmesJson.find(filme=>filme.id ==idRequerido)
    
    filmeFiltrado.titulo = newTitle
    
    response.status(200).json([{
    "mensagem": "Título atualizado com sucesso",
    filmeFiltrado
    }])
    }

    const updateAnything = (request, response) =>{
        const idRequerido = request.params.id
        const atualizacaoBody = request.body
        const filmeFiltrado = filmesJson.find(filme=>filme.id ==idRequerido)
        
            
        let listadeChaves = Object.keys(atualizacaoBody)
        
        filmeFiltrado[chave] = request.body[chave]
            
        }
        response.status(200).json([{
            "mensagem": "filme atualizado com sucesso",
            filmeFiltrado
        }])
     
    

const deleteFilme = (request, response) =>{
    const idRequerido = request.params.id
    const filmeFiltrado = filmesJson.find(filme=>filme.id ==idRequerido)
    
    const indice = filmesJson.indexOF(filmetFiltrado)
    

    filmesJson.splice(indice,1, filmeAtualizado)

    
    response.status(200).json([{
        "mensagem": "Filme deletado",
        filmesJson
    }])
    
}

module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createFilme,
    replaceFilme,
    updateTitle,
    updateAnything,
    deleteFilme


}