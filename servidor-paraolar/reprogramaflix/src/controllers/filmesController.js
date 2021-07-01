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

const createFilm = (req, resp) => {

    const {Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards} = req.body;

   
     let newMovie = {
        id: Math.random().toString(32).substr(2,6),
        Title, Year, Rated, Released, Runtime, Genre,
        Director, Writer, Actors, Plot, Language, Country, Awards

    }

    filmes.push(newMovie);
    resp.status(201).json([{
        "message": "Filme Inserido",
        newMovie
    }])

}

const updateMovie = (req, resp) => {
    const idRequired = req.params.id;
    const {Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards} = req.body;

    const movieFilter = filmes.find(movie => movie.id == idRequired);

    if(movieFilter == undefined || idRequired == ""){
        resp.status(404).json([{
            "mensagem": "Filme não encontrado"
        }])
    }
        let movieUpdated = {
            id: idRequired,
            Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards
        }

        resp.status(200).json([{
            "message": "Filme atualizado",
            movieUpdated
          }])
       
}

const deleteMovie = (req, resp) => {
    const idRequired = req.params.id;
    const movieFilter = filmes.find(movie => movie.id == idRequired);
    const index = filmes.indexOf(movieFilter);

    if(movieFilter == undefined || idRequired == "") {
        resp.status(404).json([{
            "message": "Filme não encontrado"
        }])
    }
    
    filmes.splice(index, 1)

    resp.status(200).json([{
        "message": "Filme deletado com sucesso",
        filmes
    }])
}

const updateAnythingMovie = (req, resp) => {
    const idRequired = req.params.id;
    const updateAnythingBody = req.body
    const movieFilter = filmes.find(movie => movie.id == idRequired);

    if(movieFilter == undefined || idRequired == "") {
        resp.status(404).json([{
            "message": "Filmes não encontrato"
        }])
    }

    let keyList = Object.keys(updateAnythingBody);

    keyList.forEach((key) => {
        movieFilter[key] = updateAnythingBody[key];
    })

    resp.status(200).json([{
        "message": "Filme atualizado com sucesso",
        movieFilter
    }])

    
}


module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createFilm,
    updateMovie,
    deleteMovie,
    updateAnythingMovie

}