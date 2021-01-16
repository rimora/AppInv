$(document).ready(function() {
	var existearticulo=0;
	 var l = localStorage;
	 var jsontodospedidos;
	 

    document.addEventListener("deviceready",function(){ 



   
 },false);//document.addEventListener("deviceready",function(){  
/*
	function DatosJ(estado){ 			  		      
		var json = {"Pedidos":[{"pedido":"P001","cliente":"Carpio","estado":"pendiente"},{"pedido":"P002","cliente":"Ricardo","estado":"pendiente"},{"pedido":"P003","cliente":"Carpio","estado":"entregado"},{"pedido":"P004","cliente":"Carpio","estado":"entregado"},{"pedido":"P005","cliente":"Carpio","estado":"pendiente"}]};
		var DatosJson = JSON.parse(JSON.stringify(json));
		$("#tabla").empty();
        $("#tabla").append('<tr><td>Pedido</td>'+
		'<td>Cliente</td>' + 
		'<td>Estado</td>');
		for (i = 0; i < DatosJson.Pedidos.length; i++){			
			if ((estado==DatosJson.Pedidos[i].estado) || (estado=="todos"))
			{
				$("#tabla").append('<tr>' + 
				'<td align="center" style="dislay: none;">' + DatosJson.Pedidos[i].pedido + '</td>'+
				'<td align="center" style="dislay: none;">' + DatosJson.Pedidos[i].cliente + '</td>'+
				'<td align="center" style="dislay: none;">' + DatosJson.Pedidos[i].estado + '</td>'+'</tr>');
			}//if			
		}//for
}//function DatosJ*/
function DatosJ(estado){ 			  		      
	var DatosJson = JSON.parse(JSON.stringify(jsontodospedidos));
	var html = "";
	$("#gridpedidos").empty();
	html+='<div class="ui-block-a" style="width:30%"><div class="ui-bar ui-bar-a"><strong>Pedido</strong></div></div>';
	html+='<div class="ui-block-b" style="width:50%"><div class="ui-bar ui-bar-b"><strong>Cliente</strong></div></div>';
	html+='<div class="ui-block-c" style="width:20%"><div class="ui-bar ui-bar-e"><strong>Estado</strong></div></div>';
	
    $("#gridpedidos").append('');
	for (i = 0; i < DatosJson.Pedidos.length; i++){			
		if ((estado==DatosJson.Pedidos[i].estado) || (estado=="todos"))
		{
			html+='<div class="ui-block-a" style="width:30%"><div class="ui-bar ui-bar-a"><strong><a href="#" class="clasepedido" name=" '+DatosJson.Pedidos[i].pedido +'">'+DatosJson.Pedidos[i].pedido +'</a></strong></div></div>';
			html+='<div class="ui-block-b" style="width:50%"><div class="ui-bar ui-bar-b"><strong>' + DatosJson.Pedidos[i].cliente + '</strong></div></div>';			
			html+='<div class="ui-block-c" style="width:20%"><div class="ui-bar ui-bar-e"><strong>' + DatosJson.Pedidos[i].estado + '</strong></div></div>';
		}//if			
	}//for
 $("#gridpedidos").append(html);
}//function DatosJ*/	
function DatosPedido(jsonpedido){ 			  		      
	
	var DatosJson = JSON.parse(JSON.stringify(jsonpedido));
	var html = "";	
	var estado="";
	$("#datospedido").empty();
	for (i = 0; i < DatosJson.Pedidos.length; i++){		
		html+='<p>Pedido:'+DatosJson.Pedidos[i].pedido +'  Estado: <b> '+DatosJson.Pedidos[i].estado+'</p>';
		html+='<p>Cliente:' + DatosJson.Pedidos[i].cliente + '</p>';
		html+='<p>Dirección:' + DatosJson.Pedidos[i].direccion + '</p>';
		html+='<p>Contacto:' + DatosJson.Pedidos[i].contacto + '</p>';		
		html+='<p>Telefeno:' + DatosJson.Pedidos[i].telefono + '</p>';		
		estado=DatosJson.Pedidos[i].estado;
	}//for
$("#datospedido").append(html);
	alert(estado);
if (estado=="entregado")
	{
		$("#botones").hide();
	}
}//function DatosJ*/	
	
//EVENTOS Y ELEMENTOS DE PAGINA 1
	
 $('#BtnIngresa').click(function () {  
	 jsontodospedidos = {"Pedidos":[{"pedido":"P001","cliente":"Carpio","estado":"pendiente"},{"pedido":"P002","cliente":"Ricardo","estado":"pendiente"},{"pedido":"P003","cliente":"Carpio","estado":"entregado"},{"pedido":"P004","cliente":"Carpio","estado":"entregado"},{"pedido":"P005","cliente":"Carpio","estado":"pendiente"}]};
	
      window.location.href='#pagina2';
	//  navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
 });

	//EVENTOS Y ELEMENTOS DE PAGINA 2
	
 $('#pagina2').on('pagebeforeshow',function(event, ui){	
	
	DatosJ("pendiente");
     //   navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
	
 });
$(document).on("click", ".navpedidos", function(){
	var estado= $(this).attr("name");//el nombre tiene el numero de pedido	
  	DatosJ(estado);   
});
$(document).on("click", "a.clasepedido", function(){//al seleccionar un pedido del grid se debe obtener el detalle del pedido
	var pedido= $(this).attr("name");//el nombre tiene el numero de pedido
	
	//obtiene el detalle del pedido
	var jsonpedido = {"Pedidos":[{"pedido":pedido,"cliente":"Carpio","estado":"pendiente","direccion":"Direccion","contacto":"datos del contacto","telefono":"telefono"}]};
	DatosPedido(jsonpedido);    
	window.location.href='#pagina3';
});

	
	//EVENTOS Y ELEMENTOS DE PAGINA 3
	

$('#pagina3').on('pagebeforeshow',function(event, ui){
	
	
     //   navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
	$("#textbitacora").val(''); 
	
	
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
		 navigator.notification.alert('Comentario Ingresado',null,'Guardar Comentario','Aceptar');
		 $("#textbitacora").val(''); 
	 }
		 


	//  navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
 });
$('#BtnEntregar').click(function () {  
	 alert ("Pedido entregado");
	$("#botones").hide();
	jsontodospedidos = {"Pedidos":[{"pedido":"P001","cliente":"Carpio","estado":"pendiente"},{"pedido":"P002","cliente":"Ricardo","estado":"pendiente"},{"pedido":"P003","cliente":"Carpio","estado":"entregado"},{"pedido":"P004","cliente":"Carpio","estado":"entregado"},{"pedido":"P005","cliente":"Carpio","estado":"pendiente"},{"pedido":"P006","cliente":"Carpio","estado":"entregado"}]};
	
	//  navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
 });
$("a.clasepedido").bind( "click", function(event, ui){//al seleccionar un pedido
	
             /*var recibo= $(this).attr("name");//el nombre tiene el numero de recibo en la tabla PENCOBRO
             var tipoop=window.localStorage.getItem("reimpresion");
             var bodega=window.localStorage.getItem("bodega");
             if (tipoop=='R'){//reimpresion
             imprimircobro(recibo);
             }
             else{
                 cancelarcobro(recibo);
             }*/
                 
 }); 
	
});//$(document).ready(function() 