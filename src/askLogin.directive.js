(function() {
  'use strict';

  angular.module('ask.component.login', [])
    .directive('askLogin', askLogin);

  function askLogin (){
    var directive = {
      restrict: 'E',
      scope: {
        onSubmit: '&',
        remember: '=',
        progress: '=?',
        message: '=?',
        strings: '=?',
        img: '=?'
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
          submit: 'Submit',
          remember: 'Remember me'
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
