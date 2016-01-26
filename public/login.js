(function(){
	'use strict';
	angular.module('main')
		.controller('LoginCtrl',['$scope','$http','LoginService','$sce', function(scope,$http, LoginService,$sce){
			/*scope.isLogin = function(){
				$http.get('/api/login').success(function(info){
							scope.username = info.username;
						});
					};
			scope.isLogin();*/
					
			scope.signup = function(user){
				$http.post('/api/login',user).success(function(user){
					scope.username = user.name;
				});
			};
			scope.login = function(user){
				user.isLogin = true;
				$http.post('/api/login',user).success(function(info){
					if(info.status){
						scope.username = user.name;
						LoginService.loginModal.close({username: user.name});
					} else {
					//TODO: show error message in login modal
						scope.errmsg = $sce.trustAsHtml('<i>login fail: ' + (info.err || 'unknow error') +'</i>');
					}
				});
			};
			/*scope.logout = function(){
				$http.get('/api/login/logout').success(function(){
					delete scope.username;
				});
			};*/
		}])
		/*.directive('login', function($http){
			return {
				scope: {}, //current controller's scope
				templateUrl: 'login.html',
				link: function(scope){
				//controller: function($scope, $http){
					scope.isLogin = function(){
						$http.get('/api/login').success(function(info){
							scope.username = info.username;
						});
					};
					scope.isLogin();
					
					scope.signup = function(user){
						$http.post('/api/login',user).success(function(user){
							scope.username = user.name;
						});
					};
					scope.login = function(user){
						user.isLogin = true;
						$http.post('/api/login',user).success(function(info){
							if(info.status){
								scope.username = user.name;
							}
						});
					};
					scope.logout = function(){
						$http.get('/api/login/logout').success(function(){
							delete scope.username;
						});
					};
					
				}
			};
		})*/
	/*	.controller('LoginCtrl',['$scope','$http',function($scope,$http){
			$scope.isLogin = function(){
				$http.get('/api/login').success(function(info){
					$scope.username = info.username;
				});
			};
			$scope.isLogin();
			
			$scope.signup = function(user){
				$http.post('/api/login',user).success(function(user){
					$scope.username = user.name;
				});
			};
			$scope.login = function(user){
				user.isLogin = true;
				$http.post('/api/login',user).success(function(info){
					if(info.status){
						$scope.username = user.name;
					}
				});
			};
			$scope.logout = function(){
				$http.get('/api/login/logout').success(function(){
					delete $scope.username;
				});
			};
		}]);*/
})();
