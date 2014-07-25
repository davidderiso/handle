angular.module('ramblApp',
  ['ngRoute',
   'ramblApp.app',
   'ramblApp.authServices',
   'ramblApp.easyRTCServices',
   'ramblApp.interviewServices',
   'ramblApp.navbar',
   'ramblApp.home',
   'ramblApp.login',
   'ramblApp.signup',
   'ramblApp.about',
   'ramblApp.lobby',
   'ramblApp.room'])

.config(['$routeProvider', '$httpProvider',
  function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'homeController'
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'loginController'
      })
      .when('/signup', {
        templateUrl: 'app/signup/signup.html',
        controller: 'signupController'
      })
      .when('/about', {
        templateUrl: 'app/about/about.html',
        controller: 'aboutController'
      })
      .when('/lobby', {
        templateUrl: 'app/lobby/lobby.html',
        controller: 'lobbyController'
      })
      .when('/room/:newRoom', {
        templateUrl: 'app/room/room.html',
        controller: 'roomController'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.interceptors.push('AttachTokens');
}])

.factory('AttachTokens', ['$window',
  function ($window) {
    var attach = {
      request: function(object) {
        var jwt = $window.localStorage.getItem('ramblToken');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        return object;
      }
    };
    return attach;
}])

.run(['$rootScope', '$location', '$window', 'Auth',
  function($rootScope, $location, $window, Auth) {

    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      if (next &&
          next.$$route &&
          next.$$route.controller &&
          (next.$$route.controller !== 'homeController' &&
            next.$$route.controller !== 'loginController' &&
            next.$$route.controller !== 'signupController' &&
            next.$$route.controller !== 'aboutController')) {
        Auth.isAuth()
          .then(function() {
          })
          .catch(function() {
            $location.path('/login');
          });
      }
    });
}]);
