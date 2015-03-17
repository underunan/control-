//mensajes del tooltip de cada botón realizado por bootstraps
$(function(){
	$('[data-toggle="tooltip"]').tooltip()
});


//mensaje de información de la app con bootstraps
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })