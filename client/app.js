var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            access: {
                restricted: false
            }
        })
        .when('/nav1', {
            templateUrl: 'partials/default.html',
            access: {
                restricted: true
            }
        })
        .when('/nav2', {
            templateUrl: 'partials/default.html',
            access: {
                restricted: true
            }
        })        
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            access: {
                restricted: false
            }
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {
                restricted: true
            }
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerController',
            access: {
                restricted: false
            }
        })
        .when('/settings', {
            templateUrl: 'partials/settings.html',
            controller: 'settingsController',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});

// keep track of which menu item has been selected and make it active
myApp.run(['$rootScope', '$location', function($rootScope, $location) {
    var path = function() {
        return $location.path();
    };
    $rootScope.$watch(path, function(newVal, oldVal) {
        $rootScope.activetab = newVal;
    });
}]);

// The $routeChangeStart event fires before the actual route change occurs. 
// So, whenever a route is accessed, before the view is served, 
// we ensure that the user is logged in for each view where "access:restricted" above
myApp.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function(event, next, current) {
            AuthService.getUserStatus()
                .then(function() {
                    if (next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});