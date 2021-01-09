$(document).ready(function() {
	var existearticulo=0;


    document.addEventListener("deviceready",function(){ 



   
 },false);//document.addEventListener("deviceready",function(){  
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
}//function DatosJ
 $('#BtnIngresa').click(function () {  
      window.location.href='#pagina2';
	//  navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
 });
 $('#pagina2').on('pagebeforeshow',function(event, ui){
	 //alert('hola');
	 DatosJ("pendiente");
     //   navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
	
 });
$("#radio_pendientes").bind( "change", function(event, ui) {	
  //alert($("#radio_pendientes").val());
  
	DatosJ("pendiente");   
});
$("#radio_entregados").bind( "change", function(event, ui) {	
  //alert($("#radio_pendientes").val());  
	DatosJ("entregado");    
});
$("#radio_todos").bind( "change", function(event, ui) {	
  //alert($("#radio_pendientes").val());
  
	DatosJ("todos");
});
});//$(document).ready(function() 