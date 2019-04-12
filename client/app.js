var app = angular.module('MyApp', ['ngRoute', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider) {

  // *** satellizer settings *** //
  $authProvider.github({
    url: '/auth/github',
    clientId: '5c38751d7a924251650d',
    redirectUri: window.location.origin
  });
  $authProvider.google({
    url: '/auth/google',
    clientId: '553180654335-bc34dnb5ofpkkapkms5q2b2h6sausgc3.apps.googleusercontent.com',
    
    redirectUri: window.location.origin,
  });
  $authProvider.instagram({
    url: '/auth/instagram',
    clientId: '827127ce2fcd47aa948a301b2eebabb8',
    redirectUri: window.location.origin,
  });

  $routeProvider
    .when('/', {
      templateUrl: 'partials/welcome.html',
      access: {restricted: false}
    })
    .when('/home', {
      templateUrl: 'partials/home.html',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl',
      access: {restricted: false}
    })
    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'signupCtrl',
      access: {restricted: false}
    })
    .when('/ping', {
      template: '<h1>Pong</h1>',
      access: {restricted: true}
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl',
      access: {restricted: true}
    })
    .otherwise('/');

});

app.run(function ($rootScope, $location, $route, $auth) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && !$auth.isAuthenticated()) {
      $location.path('/login');
      $route.reload();
    }
  });
});
