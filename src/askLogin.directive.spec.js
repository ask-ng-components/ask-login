(function() {
  'use strict';

  describe('directive askLogin', function() {
    var el;
    var $rootScope;

    beforeEach(module('ask.component.login'));
    beforeEach(inject(function($compile, _$rootScope_) {

      el = angular.element('<ask-login progress="progress" message="message" on-submit="onSubmit" img="img" remember="remember">' +
                             '<div class="transcluded">stuff to transclude</div>' +
                           '</ask-login>');

      $rootScope = _$rootScope_;

      $compile(el)($rootScope);
      $rootScope.$digest();
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    describe('header', function() {
      it('should only exist on img', function() {
        expect(el.find('.ask-login__header').length).toBe(0);

        $rootScope.img = 'something'
        $rootScope.$digest();
        expect(el.find('.ask-login__header').length).toBe(1);
      });

      it('should show a subtitle on img.subtitle', function() {
        $rootScope.img = {
          thing: 'thing'
        };
        $rootScope.$digest();

        expect(el.find('.ask-login__subtitle').hasClass('ng-hide')).toBe(true);


        $rootScope.img.subtitle = 'a subtitle';
        $rootScope.$digest();
        expect(el.find('.ask-login__subtitle').hasClass('ng-hide')).not.toBe(true);
        expect(el.find('.ask-login__subtitle').html()).toContain('a subtitle');
      });

      describe('header image', function() {
        it('should have an assigned src and alt', function() {
          $rootScope.img = {
            src: 'source',
            alt: 'alternate'
          };
          $rootScope.$digest();

          expect(el.find('.ask-login__image').attr('src')).toBe('source');
          expect(el.find('.ask-login__image').attr('alt')).toBe('alternate');
        });
      });


    });

    describe('login form', function() {
      it('should show by default', function() {
        expect(el.find('form').parent().hasClass('ng-hide')).not.toBe(true);
      });

      it('should show an alert on message', function() {
        expect(el.find('.alert').hasClass('ng-hide')).toBe(true);

        $rootScope.message = 'look a message';
        $rootScope.$digest();
        expect(el.find('.alert').hasClass('ng-hide')).not.toBe(true);
        expect(el.find('.alert').html()).toContain('look a message');
      });

      it('should disable submit button on click', function() {

        expect(el.find('form > button').attr('disabled')).toBeUndefined();

        $rootScope.onSubmit = function(){};
        el.find('form > button').triggerHandler('click');
        expect(el.find('form > button').attr('disabled')).toBe('disabled');
      });

      it('should re-enable submit button on message or progress', function() {
        $rootScope.onSubmit = function(){};
        el.find('form > button').triggerHandler('click');
        expect(el.find('form > button').attr('disabled')).toBe('disabled');

        $rootScope.message = '';
        $rootScope.$digest();
        expect(el.find('form > button').attr('disabled')).toBeUndefined();

        el.find('form > button').triggerHandler('click');
        expect(el.find('form > button').attr('disabled')).toBe('disabled');

        $rootScope.progress = 0;
        $rootScope.$digest();
        expect(el.find('form > button').attr('disabled')).toBeUndefined();
      });

      it('should call on-submit function with username and password', function() {
        var username,password;
        $rootScope.onSubmit = function(user, pass){
          username = user;
          password = pass;
        };

        el.find('#ask-login-username').val('aUsernam3').triggerHandler('input');
        el.find('#ask-login-password').val('aPassword').triggerHandler('input');

        el.find('form > button').triggerHandler('click');

        expect(username).toBe('aUsernam3');
        expect(password).toBe('aPassword');
      });

      describe('remember checkbox', function() {
        it('should toggle the assigned value', function() {
          expect(el.find('.ask-login__remember input').attr('checked')).toBeUndefined();
          expect($rootScope.remember).toBeUndefined();

          // check on
          el.find('.ask-login__remember input').trigger('click');
          expect($rootScope.remember).toBe(true);

          //check off
          el.find('.ask-login__remember input').trigger('click');
          expect($rootScope.remember).toBe(false);
        });
      });

      it('should include the transcluded div', function() {
        expect(el.find('.transcluded').length).toBe(1);
      });
    });

    describe('progress bar', function() {
      it('should not show by default', function() {
        expect(el.find('.progress').parent().hasClass('ng-hide')).toBe(true);
      });

      it('should not show with undefined or null', function() {
        $rootScope.progress = undefined;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).toBe(true);

        $rootScope.progress = null;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).toBe(true);
      });

      it('should show with 0', function() {
        $rootScope.progress = 0;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).not.toBe(true);
        expect(el.find('.progress-bar').css('width')).toEqual('0%');
      });

      it('should show with 20', function() {
        $rootScope.progress = 20;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).not.toBe(true);
        expect(el.find('.progress-bar').css('width')).toEqual('20%');
      });

      it('should hide again with undefined or null', function() {
        $rootScope.progress = 20;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).not.toBe(true);

        $rootScope.progress = undefined;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).toBe(true);

        $rootScope.progress = 20;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).not.toBe(true);

        $rootScope.progress = null;
        $rootScope.$digest();
        expect(el.find('.progress').parent().hasClass('ng-hide')).toBe(true);
      });
    });

    describe('strings', function() {
      xit('should have default strings for username, password and submit', function() {
      });

      xit('should be able to use assigned strings', function() {
      });
    });
  });
})();
