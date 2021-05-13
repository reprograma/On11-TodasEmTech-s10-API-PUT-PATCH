const  express  =  require ( "express" )
const  app  =  express ( )
const  cors  =  require ( "cors" )
const  express  =  require ( "express" ) ;
const  app  =  express ( ) ;
const  cors  =  require ( "cors" ) ;

app.use ( cors ( ) )  
app.use ( express.json ( ) )  
app.use ( cors ( ) ) ;  
app.use ( express.json ( ) ) ;  

const índice =  requer ( "./routes/index" )
const tarefas  =  exigir ( "./routes/toDoRoutes" ) 
const índice =  requer ( "./routes/index" ) ;
const tarefas  =  exigir ( "./routes/toDoRoutes" ) ;

app.use ( "/" ,  índice )
app.use ( "/ tarefas" ,  tarefas )
app.use ( "/" ,  índice ) ;
app.use ( "/ tarefas" ,  tarefas ) ;

module.exports =  aplicativo 
module.exports =  app ;