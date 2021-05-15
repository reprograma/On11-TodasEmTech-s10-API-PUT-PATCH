const postsJson = require('../models/posts.json')
const utilities = require('../utils/utilities')

const getAll = (req, res) => {
  res.status(200).json(postsJson)
}

const getById = (req, res) => {
  const id = req.params.id
  const post = utilities.filtrarPost(postsJson, id)
  // const post = postsJson.find(i => i.id == id)

  res.status(200).send(post)
}

const createPost = (req, res) => {
  const post = {
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
    etiquetas: req.body.etiquetas,
  }
  let newPost = {
    id: Math.random().toString(32).substr(2,6),
    dataCriacao: new Date(),
    titulo: post.titulo,
    conteudo: post.conteudo,
    etiquetas: post.etiquetas
  }
  postsJson.push(newPost)
  res.status(201).json([{
    "message": "Post Criado",
    newPost
  }])
}

const replacePost = (req, res) => {
  const id = req.params.id
  let {titulo, conteudo, etiquetas} = req.body
  const post = utilities.filtrarPost(postsJson, id)
  const index = postsJson.indexOf(post)

  let updatePost = {
    id:id,
    dataCriacao: post.dataCriacao,
    titulo,
    conteudo,
    etiquetas
  }

  postsJson.splice(index, 1, updatePost)
  
  res.status(200).json([{
    "message": "post atualizado!",
    updatePost
  }])
}

const updateTitle = (req, res) => {
  const id = req.params.id
  let title = req.body.titulo
  const post = utilities.filtrarPost(postsJson, id)
  post.titulo = title

  res.status(200).json([{
    "message": "titulo atualizado!",
    post
  }])
}

const updateAnything = (req, res) => {
  const id = req.params.id
  let bodyRequest = req.body
  const post = utilities.filtrarPost(postsJson, id)

  Object.keys(bodyRequest).forEach(key => {
    post[key] = bodyRequest[key]
  })

  res.status(200).json([{
    "message": "dados atualizados!",
    post
  }])
}

const deletePost = (req, res) => {
  const id = req.params.id
  const post = utilities.filtrarPost(postsJson, id)
  const index = postsJson.indexOf(post)
  postsJson.splice(index, 1)
  res.status(200).json({
    "message": "Post deletado",
    postsJson
  })
}

module.exports = {
  getAll,
  getById,
  createPost,
  replacePost,
  updateTitle,
  updateAnything,
  deletePost  
}
