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

angular.module("ask.component.login").run(["$templateCache", function($templateCache) {$templateCache.put("askLogin.html","<div class=\"panel panel-default\"><div class=\"panel-body\"><img ng-if=\"img\" ng-src=\"img.src\" alt=\"{{img.alt}}\"><form ng-show=\"progress === undefined || progress === null\" class=\"ask-login-form\"><div ng-show=\"message\" class=\"alert alert-danger alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> {{message}}</div><div class=\"form-group\"><label class=\"sr-only\" for=\"login-username\">{{strings.username}}</label> <input type=\"text\" ng-model=\"username\" class=\"form-control\" id=\"login-username\" placeholder=\"{{strings.username}}\"></div><div class=\"form-group\"><label class=\"sr-only\" for=\"login-password\">{{strings.password}}</label> <input type=\"password\" ng-model=\"password\" class=\"form-control\" id=\"login-password\" placeholder=\"{{strings.password}}\"></div><button class=\"btn btn-default pull-right\" ng-click=\"submit(username, password)\" ng-disabled=\"submitDisabled\">{{strings.submit}}</button></form><div ng-show=\"progress !== undefined && progress !== null\" class=\"ask-login-progress\"><div class=\"progress\"><div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" ng-style=\"{width: progress + \'%\'}\"></div></div><div ng-show=\"message\" class=\"ask-login-progress--message\">{{message}}</div></div></div></div>");}]);
}());
