var app = angular.module('miApp',[]);

//SERVICIO CREADO
//que serán llamados por su controlador.
app.service('controller_service', function(){
	
	//Obtenemos todos los datos almacenados en el localstorage
	this.get_all_storage = function (){
	var key = "";
	var datos = "";
	var valores = new Array();
	for(var i = 0; i < localStorage.length;i++){
		key = localStorage.key(i);
		datos = localStorage.getItem(key);//obtenemos el valor key para obtener su valor.
		//funcion de JSON para convertir los datos en formato json
		// y haci guardarlos en un aray con la funcion push
		valores.push(JSON.parse(localStorage.getItem(key)));
	}
	//retornamos los valores obtenidos
	return valores;
	}

	//funcion que almacena objeto lista
	this.set_storage = function (lista){
		var subtotal = parseFloat(lista.precio)*parseFloat(lista.cantidad);
		lista.subtotal = subtotal;
		//api localstorage, funcion de angular que nos almacena una
		// cadena de string en letras minuscula
		//como le estamos pasando un objeto lo convertimos 
		//en un json string
		localStorage.setItem(angular.lowercase(lista.nombre), angular.lowercase(JSON.stringify(lista)));
	}

	this.delete_producto = function (key){
		localStorage.removeItem(key);//borra un registro con la propiedad key que le pasamos a nuestra funcion
	}

	this.delete_all = function(){
		localStorage.clear();//bora todo el registro del api localstorage
	}

	//función que nos devolvera el total de todas nuestra compra
	this.total = function(){
		var lista = this.get_all_storage();
		var _total = 0.0;
		angular.forEach(lista, function(value, key) {
			if(value.total != ""){
			_total += value.subtotal;
		}else{
			_total = 0.0;
		}
		
	});
		return _total;
	}
});

//CONTROLADORES
app.controller('set_controller',['$scope','$window','controller_service',function setController($scope,$window,controller_service){
	$scope.set = {"subtotal":0.0};
	
	//función en el almacenara los datos de la compra
	$scope.set_producto = function(set){
		
		controller_service.set_storage(set);
		$scope.set.nombre ="";
		$scope.set.precio = "";
		$scope.set.cantidad = "";
		//volvemos a llamar estas funciones para actuliazar en
		//nuestra pantalla los registros mostrados como el nuevo
		// valor del total de nuestra compra
		$scope.get_producto = controller_service.get_all_storage();
		$scope.total = controller_service.total();
	}

	$scope.get_producto = controller_service.get_all_storage();

	$scope.delete_producto = function (res){
	 controller_service.delete_producto(res);
	 $scope.get_producto = controller_service.get_all_storage();
	 $scope.total = controller_service.total();
	}

	$scope.delete_all_producto = function(){
	 controller_service.delete_all();
	 $scope.get_producto = controller_service.get_all_storage();
	 $scope.total = controller_service.total();
	}

	$scope.total = 	controller_service.total();
}]);