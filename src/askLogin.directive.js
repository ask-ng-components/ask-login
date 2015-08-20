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
