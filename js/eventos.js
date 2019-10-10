
$(document).ready(function() {
    
/*
    document.addEventListener("deviceready",function(){ 

    
  },false);//document.addEventListener("deviceready",function(){    

*/
var existearticulo=0;
$('#BtnIngresa').click(function () {
  var bodega= $('#selectbodega').val();  
    if (bodega=="XXX")
    {
      alert("Seleccione bodega por favor");
    }
    else
    {
      window.location.href='#pagina2';      
    }
  });
 $('#txt-articulo').focusout(function() {
       var articulo= $('#txt-articulo').val();  
      
       /*
       $.ajax({url: "http://192.168.1.77:7010/api/articulos/"+ articulo, success: function(resultado){
            
          //alert(resultado[0].Descripcion);
          
            $('#DescripcionArticulo').html(resultado[0].Descripcion);
               existearticulo=1;
                 
            },error : function(xhr, status) {        
              
              $('#DescripcionArticulo').html("Articulo no encontrado en el catálogo");
              
            }
          });//AJAX

*/
      alert(articulo);
     
                          $.ajax({
                            url: "http://10.0.4.50:7010/api/articulos/"+ articulo,
                            type: "GET",
                            dataType: 'json',
                           // data:{dispositivo:dispositivo,tipooperacion:operacion,devcab:detalles},
                            success: function(resultado){
                            // Se ejecuta cuando se ha recibido correctamente
                            // los datos de la url
                                $('#DescripcionArticulo').html(resultado[0].Descripcion);
                                existearticulo=1;     
                            },
                            error: function(jqxhr, textStatus, error){
                                $('#DescripcionArticulo').html("Articulo no encontrado en el catálogo");
                                
                            },
                            async: false, // La petici�n es s�ncrona
                            cache: false // No queremos usar la cach� del navegador
                            });



/*
                $.getJSON("http://192.168.1.77:7010/api/articulos/"+ articulo, function(resultado) {
                  $('#DescripcionArticulo').html(resultado[0].Descripcion);
                                existearticulo=1;     
               });

*/



});

$('#BtnGuardar').click(function () {
    var cantidad= $('#num-cantidad').val();  
    var articulo= $('#txt-articulo').val();  
    var bodega= $('#selectbodega').val(); 

       if (cantidad<=0 || existearticulo==0)
       {
        alert("La cantidad debe ser mayor a cero y debe existir el articulo en el catalogo");
       }
       else
       {
         var objetoarticulo =  
                 {  
          
                     clavearticulo: articulo,  
                     descripcion: "LXI",   
                     existencia: cantidad,  
                     bodega: bodega
          
                };  
         
            var t = JSON.stringify(objetoarticulo);  
           
            
            
            
            $.ajax({type: "POST",  url: "http://10.0.4.50:7010/api/articulos/", contentType: "application/json; charset=utf-8",
                dataType: "json", data:t}).done(function( filasafectadas ) {  
               
                if (filasafectadas>0)
                {
                  $('#txt-articulo').val(""); 
                  $('#num-cantidad').val(0);
                  $('#DescripcionArticulo').html("");
                  existearticulo=0;
                  alert("Articulo insertado");
                }
                else
                {
                    alert("Ocurrio un error al guardar el conteo, consulte al administrador del sistema");
                }



            
            }); //AJAX  




          /*
          $.ajax({url: "http://localhost:7010/api/articulos/"+ articulo, success: function(resultado){
            
          //alert(resultado[0].Descripcion);
          
            $('#DescripcionArticulo').html(resultado[0].Descripcion);
               
                 
            },error : function(xhr, status) {        
              
              $('#DescripcionArticulo').html("Articulo no encontrado en el catálogo");
              
            }
          });//AJAX
*/
             
           



        }//existearticulo
    });//click
   
});//$(document).ready(function()