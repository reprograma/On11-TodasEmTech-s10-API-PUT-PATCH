
const roteador =  expresso.Roteador ( )
const  controller  =  require ( "../controllers/toDoController" )
const  express  =  require ( "express" ) ;
const roteador =  express.Roteador ( ) ;
const controller =  require ( "../controllers/toDoController" ) ;

roteador.get ( "/" ,  controller.getAll )
roteador.get ( "/: id" ,  controller.getById )
roteador.post ( "/ cadastrar" ,  controller.createTask ) ;

roteador.post ( "/ cadastrar" ,  controller.createTask )
roteador.get ( "/" ,  controller.getAll ) ;
roteador.get ( "/: id" ,  controller.getById ) ;

roteador.delete ( "/: id" ,  controller.deleteTask )
roteador.put ( "/: id" ,  controller.replaceTask ) ;

módulo.exportações  =  roteador 
roteador.delete ( "/: id" ,  controller.deleteTask ) ;

módulo.exportações  =  roteador ;