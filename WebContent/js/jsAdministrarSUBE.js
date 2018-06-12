var URL_INGRESAR_FICHADA = "/SubeUnla/IngresarFichada";
var URL_ADMINISTRAR_SUBE = "/SubeUnla/AdministrarSubes";

$(document).ready(function(){

	//FUNCIONES


	//COMPORTAMIENTO

	$('#numerotarjeta').change(function(){
		var data = {
				nroTarjeta : this.value,
				nroValidacion : 10
			}
		$.ajax({
			method: "POST",
			url: URL_ADMINISTRAR_SUBE,
			data: data,
			async: false
		}).done(function(data){
			if(data != null && data != "" && data != ''){
				console.log("Saldo Recibido : " + data);
				actualizarText($("#saldo"), data);
				//mostrarModalMensaje("Tarjeta Valida", "Tarjeta reconocida. Saldo Actualizado.")
			}
		}).fail(function(xhr, textStatus, errorThrown) {
			$('#headerModal').html('Ups! Algo salio mal!');
			$('#pModal').html(xhr.responseText);
		    $('#footerModal').modal('open');
	    });
	})

	$('#guardarTarjeta').click(function(){
		var nroTarjeta = $('#numerotarjeta').val();
		var saldo = $('#saldo').val();
		var data = {
				nroTarjeta : nroTarjeta,
				saldo : saldo,
				nroValidacion : 1
			}
		$.ajax({
			method: "POST",
			url: URL_ADMINISTRAR_SUBE,
			data: data,
			async: false
		}).done(function(data){
			if(data != null && data != "" && data != ''){
				mostrarModal(data);
				//mostrarModalMensaje("Tarjeta Valida", "Tarjeta reconocida. Saldo Actualizado.")
			}
		}).fail(function(xhr, textStatus, errorThrown) {
			mostrarModalMensaje("Error!", "Alguno de los campos es invalido!");
	    });
		
	})
	
	$('#anularTarjeta').click(function(){
		var nroTarjeta = $('#numerotarjeta').val();
		var data = {
				nroTarjeta : nroTarjeta,
				nroValidacion : 3
			}
		$.ajax({
			method: "POST",
			url: URL_ADMINISTRAR_SUBE,
			data: data,
			async: false
		}).done(function(data){
			if(data != null && data != "" && data != ''){
				mostrarModal(data);
				actualizarText($("#saldo"), "");
				actualizarText($("#numerotarjeta"), "");
			}
		}).fail(function(xhr, textStatus, errorThrown) {
			mostrarModalMensaje("Error!", "Alguno de los campos es invalido!");
	    });
		
	})

});