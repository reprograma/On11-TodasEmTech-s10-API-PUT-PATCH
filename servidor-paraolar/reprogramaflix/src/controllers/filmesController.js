const { request } = require("../app")
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

const createPost = (request, response) => {
    let titleRequerido = request.body.title
    let yearRequerido = request.body.year
    let genreRequeridas = request.body.genre

    let newPost = {
        id:Math.random().toString(32).substr(2,3) ,
        Title:titleRequerido ,
        year:yearRequerido,
        Genre: genreRequeridas,
       
    };
    postsJson.push(newPost)

    response.status(201).json([{
        "mensagem": "Post Criado",
        newPost
    }])

}

const replacePost = (request, response) => {
    const idRequerido = request.params.id
    let postAtualizado = request.body
    const postFiltrado = postsJason.find(post => post.id == idRequerido)
    
    const indice = postsJason.indexOf(postFiltrado)
    postAtualizado.id = idRequerido
    postAtualizado.year = postFiltrado.year

    postJason.splice(indice, 1, postAtualizado)

    response.status(200).json([{
        "mensagem": "Post atualizado"
    }])
},
const updateTitle = (request, response)=> {
    const idRequerido = request.params.id
    let newTitle = request.body.title
    const postFiltrado = postJason.find(post => post.id == idRequerido)

    postFiltrado.title = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        postFiltrado
    }])

 }


const deletePost = (request, response) => {
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    const indice = postsJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Post deletado",
        postsJson
    }])
}
 
module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createPost,
    replacePost,
    updateTitle,
    deletePost,
}