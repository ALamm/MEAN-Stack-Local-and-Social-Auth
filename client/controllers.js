
angular.module('myApp').controller('indexController', ['$scope', '$rootScope', '$route', '$timeout', 'AuthService', 'CookieService',
    function($scope, $rootScope, $route, $timeout, AuthService, CookieService) {

        // initialize the title of the app
        $rootScope.TITLE = "APP TITLE";

        // initialize userid.  Used to persist the userid and username (in case of page refresh) and to get/update user settings
        var userid = CookieService.getCookieUserId();

        // initialize username for use throughout the site
        $rootScope.username = CookieService.getCookieUsername();

        // check if user is logged in 
        // used to update 'logged' variable for the navbar to show/hide nav elements
        AuthService.getUserStatus()
            .then(function(res) {
                // if a user has logged in then res.data.status = true
                if ( res.data.status ) {
                    // set the username and cookies when an oAuth user logs in. 
                    //Local login is set within loginController below
                    // var obj = res.data.user;
                    if (res.data.user.hasOwnProperty("someID") === true) {  //   oAuth user is currently logged in
                        $rootScope.username = res.data.user.name;
                        CookieService.setCookie(res.data.user._id, res.data.user.name)
                    }
                }
                $rootScope.logged = AuthService.isLoggedIn();
            });
    }            
]);

angular.module('myApp').controller('loginController', ['$scope', '$rootScope', '$location', '$route', 'AuthService', 'CookieService',
    function($scope, $rootScope, $location, $route, AuthService, CookieService) {

        // set which login options will be shown on login view
        $scope.oauthTwitter = true;
        $scope.oauthFacebook = true;
        $scope.oauthGoogle = false;
        $scope.oauthGithub = true;
        $scope.oauthLinkedIn = true;

        $scope.login = function() {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function(res) {
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    $rootScope.logged = true;
                    $rootScope.username = res.username;
                    CookieService.setCookie(res.id, res.username);
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });
        };
    }
]);


angular.module('myApp').controller('logoutController', ['$scope', '$rootScope', '$location', 'AuthService', 'CookieService',
    function($scope, $rootScope, $location, AuthService, CookieService) {

        $scope.logout = function() {

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $rootScope.logged = false;
                    $rootScope.username = '';
                    CookieService.setCookie('', '');
                    $location.path('/login');
                });
        };
    }
]);

angular.module('myApp').controller('registerController', ['$scope', '$location', '$timeout', '$route', 'AuthService',
    function($scope, $location, $timeout, $route, AuthService) {

        $scope.register = function() {

            // initial values
            $scope.error = false;
            $scope.success = false;
            $scope.disabled = true;

            // call register from service
            AuthService.register($scope.registerForm.username, $scope.registerForm.password)
                // handle success
                .then(function() {
                    $scope.success = true;
                    $scope.successMessage = "Registration Complete!"
                    $scope.disabled = false;
                    $scope.registerForm = {};
                    $timeout(function() {
                    $location.path('/login');
                    }, 4000);

                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });
        };
    }
]);

angular.module('myApp').controller('settingsController', ['$scope', '$rootScope', '$location', '$route', 'AuthService', 'CookieService',
    function($scope, $rootScope, $location, $route, AuthService, CookieService) {

        var userid = CookieService.getCookieUserId();

        $scope.getSettings = function() {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call the getSettings from service
            AuthService.getSettings(userid)
            
                //handle success
                .then(function(res) {
                    $location.path('/settings');
                    $scope.disabled = false;
                    $scope.settingsForm = {
                        first: res.data.first,
                        last: res.data.last,
                        city: res.data.city,
                        state: res.data.state
                    };
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Couldn't get the settings";
                    $scope.disabled = false;
                    $scope.settingsForm = {};
                });
        };
        $scope.getSettings();


        $scope.updateSettings = function() {
            // initial values
            $scope.success = false;
            $scope.error = false;
            $scope.disabled = true;

            // call updateSettings from service
            AuthService.updateSettings(userid, $scope.settingsForm.first, $scope.settingsForm.last, $scope.settingsForm.city, $scope.settingsForm.state)

                // handle success
                .then(function(res) {
                    $location.path('/settings');
                    $scope.success = true;
                    $scope.successMessage = "Settings Updated!"
                    $scope.disabled = false;
                    $scope.settingsForm = {
                        first: res.data.first,
                        last: res.data.last,
                        city: res.data.city,
                        state: res.data.state
                    };
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid first, last, city or state";
                    $scope.disabled = false;
                    $scope.settingsForm = {};
                });
        };
    }
]);



