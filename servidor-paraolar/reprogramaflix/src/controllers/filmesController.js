const filmes = require("../models/filmes.json") //chamar nosso json
const utils = require("../utils/metodos")




// modules exports

const getAll = (request, response) => response.status(200).send(filmes)
    



const getById = (request, response)=> {
    const filme = utils.oneFind(filmes, "id", request.params.id)
    if (filme==undefined) return response.status(400).send({ 
        mensagem : "Por favor, digite uma id válida."
    }) 
    return response.status(200).send(filme)
}



const getByTitle = (request, response)=>{

    const titulo = request.query.titulo.toLowerCase();
    const filtro = utils.oneFind(filmes, "Title", titulo, true)
    if (filtro && titulo.length > 0 && titulo != "") response.status(200).send(filtro)

    else response.status(400).json({ 
        mensagem : "Descupa, titulo não encontrado"
    })
}


const getByGenre = (request, response) => {
    const genero = request.query.genero.toLowerCase();
    const filme = filmes.filter(filme => {
        let generSeach = filme.Genre
        .split(",")
        .find(gener => gener.toLowerCase().includes(genero));
        if (generSeach) return filme;
    })
    

    if (filme.length==0 || genero == "")
    response.status(400).json({ "mensagem" : "desculpa, genero não encontrado"});
    else response.status(200).json(filme)
   
}

const deleteById = (request, response) => {
    const id = filmes.findIndex(e => request.params.id==e.id);
    if (id==-1) return response.status(400).send({ 
        mensagem : "Por favor, digite uma id válida."
    }) 

    filmes.splice(id, 1)

    response.status(200).send({
        'mensagem' : 'deletado com sucesso!'
    })
}






const createFilme = (request, response) => {
    const bodyData = utils.validadeInputs(request.body, true)
    delete bodyData.id;
    if (!bodyData ||  Object.keys(bodyData).length != Object.keys(filmes[0]).length-1) {
    return response.status(400).send({
        mensagem :  "por favor, verficar os paramentros body"
    }) 
}

    bodyData.id = Math.random().toString(32).substr(0, 9);

    filmes.push(bodyData)
    
    response.status(201).send({
        'mensagem'  :  ' Sucesso! '
    })
}



const replaceFilme = (request, response) => {
    
    const bodyData = utils.validadeInputs(request.body, false)
    const filme = utils.oneFind(filmes, "id", request.params.id)

    if (filme==undefined || !bodyData) return response.status(400).send({ 
        mensagem : "Por favor, verificar se enviou o ID correto e ao menos uma propriedade no json"
    }) 
    
    // removendo parte da automacao
    delete bodyData.id;
    for (let key of Object.keys(bodyData)) {
        if (!Object.keys(filme).includes(key)) return response.status(400).send({ 
            mensagem : "Por favor, verificar a chave do json!"
        })
    }

    // add new json
    let newJson = {}
    for (let key of Object.keys(filme)) {
        newJson[key] = bodyData[key] || filme[key]
    }


    // replace
    filmes.splice(filmes.indexOf(filme) , 1, newJson)
    
    
    response.status(200).send({
        'mensagem' : 'Sucesso !'
    })
    

}

const updateFilme = (request, response) => {

    const bodyData = utils.validadeInputs(request.body, false)
    const filme = utils.oneFind(filmes, "id", request.params.id)

    if (filme==undefined || !bodyData) return response.status(400).send({ 
        mensagem : "Por favor, verificar se enviou o ID correto e ao menos uma propriedade no json"
    }) 
    
    // removendo parte da automacao
    delete bodyData.id;
    for (let key of Object.keys(bodyData)) {
        if (!Object.keys(filme).includes(key)) return response.status(400).send({ 
            mensagem : "Por favor, verificar a chave do json!"
        })
    }

    for (let key of Object.keys(bodyData)) {
        filme[key] = bodyData[key];
    }    
    
    response.status(200).send({
        'mensagem' : 'Sucesso !'
    })
    

}


const updateByTitle = (request, response)=>{
    const bodyData = utils.validadeInputs(request.body, true)
    if (!bodyData) {
        response.status(400).json({ 
            mensagem : "Descupa, json vazio ou incorreto"
        })
        return;
    }

    const titulo = request.query.titulo;
    const filme = utils.oneFind(filmes, "Title", titulo)


    if (filme && titulo.length > 0 && titulo != "") {
     filme.Title = bodyData.Title;
         
    response.status(200).send({
        'mensagem' : 'Sucesso !'
    })
    
    }

    else response.status(400).json({ 
        mensagem : "Descupa, titulo não encontrado"
    })

}
module.exports = { //exportando as funções
    getAll,
    getById,
    getByTitle,
    getByGenre,
    deleteById,
    createFilme,
    updateFilme,
    updateByTitle,
    replaceFilme
}