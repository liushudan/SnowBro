(function (express, server){
    
    server.use(express.static('public'));
    
    server.get('/', function(req,res){
               res.redirect('index.html');
    });

    server.listen(process.env.PORT /*8080,*/, process.env.IP /*|| 'localhost'*/, function(){
       console.log("server is online"); 
        
    });
    

}
 
 )( 
    require('express'),
    require('express')()
  );