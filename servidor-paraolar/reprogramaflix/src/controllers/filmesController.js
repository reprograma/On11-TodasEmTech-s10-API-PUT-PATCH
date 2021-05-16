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

const createTask = (request, response) =>{
    const titleRequerido = request.body.Title
    const anoRequerido = request.body.Year


        console.log(titleRequerido)
        console.log(anoRequerido)

    const novaTarefa ={
        id: Math.random().toString(32).substring(2,9),
        Title: titleRequerido,
        Year: anoRequerido
    }

      filmes.push(novaTarefa)

      response.status(201).json([{
          "mensagem": "filme inserido",
          novaTarefa
      }])

}

const replaceFilme = (request, response )=>{
    const idRequerido = request.params.id
    let postAtualizado = request.body
    const idFiltrado = filmes.find(filme => filme.id == idRequerido)
    const indice = filmes.indexOf(idFiltrado)

    console.log(postAtualizado)

    postAtualizado.id = idRequerido
    
    filmes.splice(indice, 1, postAtualizado)
      
    response.status(200).json([{
        "menssagem": "Post atualizado com sucesso",
         postAtualizado
    }])


}
const deleteTask = (request, response) =>{
    const idRequerido = request.params.id
    let idFiltrado = filmes.find(filme => filme.id == idRequerido)
    const indice = filmes.indexOf(idFiltrado)
    filmes.splice(indice, 1)
    response.status(200).json([{
        "menssagem": "Filme deletado com sucesso",
        filmes
    }])
}



module.exports ={
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createTask,
    deleteTask,
    replaceFilme

} //exportando as funções
    