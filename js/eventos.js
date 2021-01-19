$(document).ready(function() {
	 var existearticulo=0;
	 var l = localStorage;	 
	 var pedidoactual;

    document.addEventListener("deviceready",function(){ 



   
 },false);//document.addEventListener("deviceready",function(){  
function CrearGridPedidos(){ 			  		      
	var html = "";
	
	$("#gridpedidos").empty();
	html+='<div class="ui-block-a" style="width:30%"><div class="ui-bar ui-bar-a"><strong>Pedido</strong></div></div>';
	html+='<div class="ui-block-b" style="width:70%"><div class="ui-bar ui-bar-b"><strong>Cliente</strong></div></div>';    

	//  navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
	  $.ajax({
                            url: "http://localhost:60481/api/pedidos/",                         
                            type: "GET",
                            dataType: 'json',                           
                            success: function(resultado){
                            // Se ejecuta cuando se ha recibido correctamente
                            // los datos de la url
							
								var	DatosJson=JSON.parse(JSON.stringify(resultado));								
								for (i = 0; i < DatosJson.length; i++){		
									html+='<div class="ui-block-a" style="width:30%"><div class="ui-bar ui-bar-a"><strong><a href="#" class="clasepedido" name="'+DatosJson[i].pedido +'">'+DatosJson[i].pedido +'</a></strong></div></div>';
									html+='<div class="ui-block-b" style="width:70%"><div class="ui-bar ui-bar-b"><strong>' + DatosJson[i].cliente + '</strong></div></div>';			
								}//for
                            },
                            error: function(jqxhr, textStatus, error){
                               // $('#DescripcionArticulo').html("Articulo no encontrado en el catálogo");
                                alert("error");
                            },
                            async: false, // La petici�n es s�ncrona
                            cache: false // No queremos usar la cach� del navegador
                            });		
	$("#gridpedidos").append(html); 
}//function CrearGridPedidos	
function DatosPedido(jsonpedido){ 			  		      
	
	var DatosJson = JSON.parse(JSON.stringify(jsonpedido));
	var html = "";	
	var estado="";
	$("#datospedido").empty();
	for (i = 0; i < DatosJson.length; i++){		
		html+='<p>Pedido:'+DatosJson[i].pedido +'</p>';
		html+='<p>Cliente:' + DatosJson[i].cliente + '</p>';
		html+='<p>Dirección Cobro:' + DatosJson[i].dircobro + '</p>';
		html+='<p>Dirección Embarque:' + DatosJson[i].dirembarque + '</p>';
		html+='<p>Contacto:' + DatosJson[i].contacto + '</p>';		
		html+='<p>Teléfono:' + DatosJson[i].telefono + '</p>';		
		pedidoactual=DatosJson[i].pedido;
	}//for
$("#datospedido").append(html);

}//function DatosJ	
 $('#BtnIngresa').click(function () {  
	CrearGridPedidos();
	window.location.href='#pagina2';
	
 });
$(document).on("click", "a.clasepedido", function(){//al seleccionar un pedido del grid se debe obtener el detalle del pedido
	var pedido= $(this).attr("name");//el nombre tiene el numero de pedido
	
	//obtiene el detalle del pedido	
	$.ajax({
                            url: "http://localhost:60481/api/pedidos/"+pedido,                         
                            type: "GET",
                            dataType: 'json',                           
                            success: function(resultado){
                            // Se ejecuta cuando se ha recibido correctamente                            
								/*
							alert(JSON.stringify(resultado));
							jsontodospedidos=JSON.parse(JSON.stringify(resultado));
							alert(jsontodospedidos[0].pedido);
							*/
							DatosPedido(resultado);
                            },
                            error: function(jqxhr, textStatus, error){                               
                                alert("error");
                            },
                            async: false, // La petici�n es s�ncrona
                            cache: false // No queremos usar la cach� del navegador
                            });	  
	window.location.href='#pagina3';
});
$('#pagina3').on('pagebeforeshow',function(event, ui){
	
     //   navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
	$("#textbitacora").val(''); 
	$("#botones").show();	
	
 });
 $('#BtnComentario').click(function () {  
	 var comentario= $('#textbitacora').val(); 	 
	 if (comentario=="")
	 {
		alert("Debe indicar comentario");
	 }
	 else
	 {
		//guardar comentario en servidor
		 var objetocomentario =  
                 {  
          
                     ClavePedido: pedidoactual,  
                     comentario: comentario,
					 Entregado:false
                };  
         
            var t = JSON.stringify(objetocomentario);  
           
            $.ajax({type: "POST",  url: "http://localhost:60481/api/pedidos/", contentType: "application/json; charset=utf-8",           
                dataType: "json", data:t}).done(function( filasafectadas ) {  
               
                if (filasafectadas>0)
                {
                  
                  alert("Comentario insertado");
				  $("#textbitacora").val(''); 
                }
                else
                {
                    alert("Ocurrio un error al guardar el comentario, consulte al administrador del sistema");
                }
				
            }); //AJAX  

		 //navigator.notification.alert('Comentario Ingresado',null,'Guardar Comentario','Aceptar');
		 
	 }
		 


	//  navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
 });
 $('#BtnEntregar').click(function () {  
	 var objetocomentario =  
                 {            
                     ClavePedido: pedidoactual,  
                     Entregado: true          
                };  
         
            var t = JSON.stringify(objetocomentario);              
            $.ajax({type: "POST",  url: "http://localhost:60481/api/pedidos/", contentType: "application/json; charset=utf-8",           
                dataType: "json", data:t}).done(function( filasafectadas ) {  
               
                if (filasafectadas>0)
                {
                  
                  alert("Pedido Actualizado");				  
				  CrearGridPedidos();
                }
                else
                {
                    alert("Ocurrio un error al actualizar el pedido,consulte al administrador del sistema");
                }
				
            }); //AJAX  
	
	
	//$("#gridpedidos").empty();
	$("#botones").hide();	
	
	//  navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
 });
});//$(document).ready(function() 