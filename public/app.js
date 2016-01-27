(function(){
    'use strict';
	
    angular.module('main',['ui.bootstrap','ui.router'])
        .service('LoginService', function($http){
		    var self = this;
		    $http.get('/api/login', function(info){
			self.username = info.username;
		    });
            self.getUser = function() {
                return $http.get('/api/login');
            }
            self.logout = function() {
            	return $http.get('/api/login/logout');
            }
		})
        .config(function($stateProvider,$urlRouterProvider){
        	$urlRouterProvider.otherwise('/');

        	$stateProvider
        		.state('list', {
        			url:'/',
			    	templateUrl: 'list.html',
			    	controller: 'UserCtrl',
		            controllerAs: 'user'
				})
				.state('user', {
				    url: '/user',
				    templateUrl: 'user.html',
				    controller: 'UserCtrl',
		            controllerAs: 'user'
				});

        })
	/*.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	    $routeProvider
			.when('/', {
			    templateUrl: 'list.html',
			    controller: 'UserCtrl',
	            controllerAs: 'user'
			})
			.when('/user', {
			    templateUrl: 'user.html',
			    controller: 'UserCtrl',
	            controllerAs: 'user'
			})
			.otherwise({redirectTo:'/'});
		
		$locationProvider.html5Mode(true);


	}])*/
		/*.factory('L2', function($http){
			var self = this;
			return {
			    getUser: function(){
                    return $http.get('api/login')
			}
		}
		})*/
		
		.controller('UserCtrl',['$scope','$http','$uibModal','LoginService',
								function($scope,$http,$uibModal,LoginService){
	        var self = this;
            
            LoginService.getUser().success(function(data){
                //if use then, the username should be like 
                //data.data.username
                self.username = data.username;
            });        
           /* L2.getUser().success(function(data){
                //if use then, the username should be like 
                //data.data.username
                self.username1 = data.username;
            }) ;    */   
            
            $http.get('/api/user').success(function(data){
				self.users = {};
				data.forEach(function(user){
					self.users[user._id] = user;
				})
			});

			self.logout = function(){
				LoginService.logout().then(function(){
					delete self.username;
				})
			};		

			self.add = function(user){
				$http.post('/api/user',user).success(function(data){
					self.users[data.user._id] = data.user;
				});
			};
			self.selectUser = function(user){
				self.newUser = angular.copy(user);
			}	
			self.updateUser = function(user){
				$http.put('/api/user',user).success(function(data){
					self.users[data.user._id] = data.user;
				});
			};
			
			self.del = function(uid){
				$http.delete('api/user/' + uid).success(function(){
					delete self.users[uid];
				});
			};
	        self.openLoginForm = function(){
	        	LoginService.loginModal = $uibModal.open({
	                templateUrl: "login.html",
	                controller: "LoginCtrl"
	            });
	        LoginService.loginModal.result.then(function(data){
	            self.username = data.username;
            });
        };
	}]);
})()
