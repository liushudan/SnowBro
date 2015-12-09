(function (express, server){
    
    server.use(express.static('public'));
    
    server.get('/', fuction(req,res){
               res.redirect('index.html');
    });

    server.listen(process.env.PORT, process.env.IP, function(){
       console.log("server is online"); 
        
    });
    

}
 
 )( 
    require('express'),
    require('express')()
  );