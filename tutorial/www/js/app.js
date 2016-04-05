// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic', 'ngStorage']);

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

myApp.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
}]);

myApp.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  // Estados abstractos, no generan historial de navegación
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
 // Estados de vistas, generan historial de navegación
  .state('tab.login', {
    url: '/inicio/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/inicio/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('tab.registrarse', {
    url: '/inicio/registrarse',
    views: {
      'tab-registrarse': {
        templateUrl: 'templates/inicio/registrarse.html',
        controller: 'RegistreseCtrl'
      }
    }
  })
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.coche', {
    url: '/coche',
    views: {
      'tab-coche': {
        templateUrl: 'templates/coche.html',
        controller: 'CocheCtrl'
      }
    }
  })
  .state('tab.comunidad', {
    url: '/comunidad',
    views: {
      'tab-comunidad': {
        templateUrl: 'templates/comunidad.html',
        controller: 'ComunidadCtrl'
      }
    }
  })
  .state('tab.datos', {
    url: '/datos',
    views: {
      'tab-datos': {
        templateUrl: 'templates/datos.html',
        controller: 'DatosCtrl'
      }
    }
  })
  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/info.html',
        controller: 'InfoCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/tab/inicio/login');
});

myApp.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
          });
      }
  };
});

myApp.controller('HomeCtrl', ['$scope', function($scope){
  $scope.visitantes = [
    {huesped: "Geiser", nombre: "Dayana", coche: "Tsuru 2012", aceptado: "Aceptado", foto: "foto_perfil (1)"},
    {huesped: "Carlos", nombre: "Medina", coche: "Fiesta 2015", aceptado: "Rechazado", foto: "foto_perfil (2)"},
    {huesped: "David", nombre: "Reyes", coche: "Hummer 2012", aceptado: "Aceptado", foto: "foto_perfil (3)"},
    {huesped: "Alberto", nombre: "Perez", coche: "Golf 2000", aceptado: "Aceptado", foto: "foto_perfil (4)"}
  ];
}]);

myApp.controller('CocheCtrl', function($scope){
  console.log("Estás en el coche");
});

myApp.controller('ComunidadCtrl', function($scope){
  // Variables
  $scope.captura = null;
  $scope.residentes = [
      {nombre: "Mario", apellido: "Castañeda", telefono: "9992346777", foto: "foto_perfil (1)"},
      {nombre: "Luis", apellido: "Navarro", telefono: "9993231547", foto: "foto_perfil (2)"},
      {nombre: "Karen", apellido: "Peniche", telefono: "9999773783", foto: "foto_perfil (3)"},
      {nombre: "Alberto", apellido: "Gonzales", telefono: "9991540033", foto: "foto_perfil (4)"}
    ];

  // Métodos
  $scope.TomarFoto = function() {
    // capture callback
    var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
        } 
        $scope.captura = path;
        $scope.$digest();
    };
    
    // capture error callback
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    // start image capture
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
  }
});

myApp.controller('DatosCtrl', function($scope){
  console.log("Estás en los datos");
});

myApp.controller('InfoCtrl', function($scope, $http, $state){
  console.log("Estás en la info");
});

myApp.controller('LoginCtrl', function($scope, $http, $state, $sessionStorage, $ionicPopup, $timeout, $rootScope, $templateCache, $httpParamSerializerJQLike){
  $scope.IniciarSesion = function(){
    /*var url = "http://privadas.esy.es/index.php?r=usuarios/IniciaSesion";
    $http({
    method: "POST", 
    url: url,
    cache: $templateCache,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: $httpParamSerializerJQLike({
          "contrasenia": this.password, 
          "usuario": this.usuario
        })
    }).*/
    var url = "http://privadas.esy.es/index.php?r=usuarios/IniciaSesion&usuario="+this.usuario+"&contrasenia="+this.password;
    $http({
    method: "GET", 
    url: url,
    cache: $templateCache
    }).
    then(
      function(response) {
        $scope.data = response.data;
        $scope.status = response.status;
        // Comprueba si el usuarii existe en la BD
          if($scope.data[0].resultado == "valido"){
            $rootScope.hideTabs = '';
            $sessionStorage.usuario = $scope.data[0].DetalleUsuario;
            window.location = "#/tab/home";
          }
          else{
            var myPopup = $ionicPopup.show({
              title: 'Ups!!',
              subTitle: '"El usuario que ingresó no exite o la contraseña no es válida. Intente nuevamente."',
              scope: $scope
            });

            $timeout(function() {
               myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
          }
      }, 
      function(response) {
        $scope.data = response.data || "Request failed";
        $scope.status = response.status;
    });
  }

  // Método para ir al State "Registrar un usuario"
  $scope.Registrarse = function(){
     window.location = "#/tab/inicio/registrarse";
  }
});

myApp.controller('RegistreseCtrl', function($scope, $http, $state, $sessionStorage, $ionicPopup, $timeout, $templateCache){
  
  $scope.captura = "img/ionic.png";

  var url = "http://privadas.esy.es/index.php?r=tipousuario/ListaTipoUsuario";
  $http({
    method: "GET", 
    url: url,
    cache: $templateCache
    }).
    then(
      function(response) {
        $scope.tiposUsuarios = response.data;
        $scope.$digest();
        alert(response.data);
      }, 
      function(response) {
        $scope.data = response.data || "Request failed";
        $scope.status = response.status;
    });

  // Métodos
  $scope.TomarFoto = function() {
    // capture callback
    var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
        } 
        $scope.captura = path;
        $scope.$digest();
    };
    
    // capture error callback
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    // start image capture
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
  }
});