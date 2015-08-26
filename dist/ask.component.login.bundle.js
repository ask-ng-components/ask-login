(function() {
  'use strict';

  angular.module('ask.component.login', [])
    .directive('askLogin', askLogin);

  function askLogin (){
    var directive = {
      restrict: 'E',
      scope: {
          progress: '=?',
          message: '=?',
          strings: '=?',
          img: '=?',
          onSubmit: '&'
      },
      templateUrl: 'askLogin.html',
      transclude: true,
      link: askLoginLink
    };
    return directive;

    function askLoginLink(scope, iElement, iAttrs) {
      if(!scope.strings){
        scope.strings = {
          username: 'Username',
          password: 'Password',
          submit: 'Submit'
        };
      }

      scope.submit = submit;

      scope.$watchGroup(['message', 'progress'], function(){
        if(scope.submitDisabled){
          scope.submitDisabled = false;
        }
      });

      function submit(username, password) {
        scope.submitDisabled = true;
        scope.onSubmit()(username, password);
      }
    }
  }
})();

;(function() {
"use strict";

angular.module("ask.component.login").run(["$templateCache", function($templateCache) {$templateCache.put("askLogin.html","<div class=\"panel panel-default ask-login\"><div class=\"panel-body\"><img ng-if=\"img\" ng-src=\"img.src\" alt=\"{{img.alt}}\"><div ng-show=\"progress === undefined || progress === null\" class=\"ask-login__form\"><div ng-show=\"message\" class=\"alert alert-danger alert-dismissible ask-login__alert\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> {{message}}</div><form><div class=\"form-group\"><label class=\"sr-only\" for=\"ask-login-username\">{{strings.username}}</label> <input type=\"text\" ng-model=\"username\" class=\"form-control\" id=\"ask-login-username\" placeholder=\"{{strings.username}}\"></div><div class=\"form-group\"><label class=\"sr-only\" for=\"ask-login-password\">{{strings.password}}</label> <input type=\"password\" ng-model=\"password\" class=\"form-control\" id=\"ask-login-password\" placeholder=\"{{strings.password}}\"></div><button class=\"ask-login__submit-button btn btn-default\" ng-class=\"\" ng-click=\"submit(username, password)\" ng-disabled=\"submitDisabled\">{{strings.submit}}</button></form><ng-transclude></ng-transclude></div><div ng-show=\"progress !== undefined && progress !== null\" class=\"ask-login__progress\"><div class=\"progress\"><div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" ng-style=\"{width: progress + \'%\'}\"></div></div><div ng-show=\"message\" class=\"ask-login__message\">{{message}}</div></div></div></div>");}]);
}());
