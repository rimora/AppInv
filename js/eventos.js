$(document).ready(function() {
	var existearticulo=0;
var json = {"alumnoUTP":[{"nombre":"Ricardo","apePaterno":"Carpio","edad":39},{"nombre":"Thiago","apePaterno":"Carpio","edad":5},{"nombre":"José","apePaterno":"Carpio","edad":74}]};

    document.addEventListener("deviceready",function(){ 




   
 },false);//document.addEventListener("deviceready",function(){    
 $('#BtnIngresa').click(function () {  
      window.location.href='#pagina2';  
 });
 $('#pagina2').live('pagebeforeshow',function(event, ui){
        navigator.notification.alert('Dentro de page',null,'Documentos Pendientes de Cobro','Aceptar');
	var DatosJson = JSON.parse(JSON.stringify(json));
    //console.log(DatosJson.alumnoUTP.length);
    $("#tabla").append('<tr><td>Nombre</td>'+
 	'<td>Apellido paterno</td>' + 
 	'<td>Edad</td>');
    for (i = 0; i < DatosJson.alumnoUTP.length; i++){
 
		$("#tabla").append('<tr>' + 
		'<td align="center" style="dislay: none;">' + DatosJson.alumnoUTP[i].nombre + '</td>'+
		'<td align="center" style="dislay: none;">' + DatosJson.alumnoUTP[i].apePaterno + '</td>'+
		'<td align="center" style="dislay: none;">' + DatosJson.alumnoUTP[i].edad + '</td>'+'</tr>');
	}
 });
});//$(document).ready(function() 