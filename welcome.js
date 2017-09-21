/**
 * Created by Daudi on 8/20/2016.
 */

/** this is the welcome page javascript helpers page for:
 * landing page
 welcome pg/video template;
 sign up template
 login template
 and help/chat template
 **/

//we start with the landingPage page
Template.landingPage.helpers ({
   daysCount: function() {
      // console.log(moment('2016-11-01').format("dddd, h:mm a MM/DD/YYYY"));
       var timeCount = moment('2017-02-15').fromNow();
       return timeCount;
   },
    landingEmail: function() {
       return Session.get('landingEmail');
    }
});

Template.landingPage.onRendered( function(){
    Session.set('landingEmail', '');
});

//the landingPage page events
Template.landingPage.events({
    'submit form': function(e) {
        e.preventDefault();
        var emailVar = $('#landingEmail').val();
         var email = {
             address: $('#landingEmail').val()
         }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailVar)) {
            Meteor.call('addEmaillist', email);
            Session.set('landingEmail', '');
            Bert.alert( "Thank you, your email has been added", 'info', 'fixed-top' );
        } else {
            Session.set('landingEmail', 'error');
        }
    }
});

var timer = new Chronos.Timer(100);
Tracker.autorun(function() {
    timer.time.get();

    var startSlides = Session.get('startSlideOneTime');
    var slidesTime = parseInt((Chronos.currentTime(1000) - startSlides) / 1000);
    var slideStage = Session.get('slideStage');


    if ( slideStage == 'slideOne' && (slidesTime == 6) ) {

        Session.set('slideStage', 'slideTwo');

    } else if ( slideStage == 'slideTwo' ) {

     if ( slidesTime == 6 ) {

         Session.set('slideTwoStage', 'slideTwoOne');


     } else if ( slidesTime == 12 ) {

         Session.set('slideTwoStage', 'slideTwoTwo');

     } else if ( slidesTime == 16 ) {

         Session.set('slideTwoStage', 'slideTwoThree');

     }

     else if ( slidesTime == 20 ) {

          Session.set('slideStage', 'slideThree');

      }


    } else if ( slideStage == 'slideThree' ) {

        if ( slidesTime == 20 ) {

            Session.set('slideThreeStage', 'slideThreeOne');

        } else if ( slidesTime == 30 ) {

            Session.set('slideThreeStage', 'slideThreeTwo');

        } else if ( slidesTime == 40 ) {

            Session.set('slideThreeStage', 'slideThreeThree');

        }

        else if ( slidesTime == 50 ) {

            Session.set('slideThreeStage', 'slideThreeFour');

        } else if ( slidesTime == 60 ) {

            Session.set('slideStage', 'slideOne');
            Session.set('startSlideOneTime', Chronos.now());
        }

    }

    // console.log(slidesTime);


});

Template.welcome.onCreated( function() {
    this.subscribe( 'mainMeals' );
    this.subscribe( 'mainExercises');
});

//then the welcome page
Template.welcome.helpers ({
   meals: function () {
       return Meals.find({title: 'mealTime'});
   },
   exercises: function () {
        return Exercises.find({title: 'exerciseTime'});
    },
    toDay: function () {
        return moment().format("ddd, MMM Do YYYY");

    },
    clock: function () {
        return Chronos.moment().format('h:mm:ss A'); // updates every second
    },
    welcomeStatus: function () {
        return Session.get('welcomeStatus');
    },
    mealMessageOne: function () {
        return Session.get('mealMessageOne');
    },
    exerciseMessageOne: function () {
        return Session.get('exerciseMessageOne');
    },
    exerciseMessageTwo: function () {
        return Session.get('exerciseMessageTwo');
    },
    exerciseMessageThree: function () {
        return Session.get('exerciseMessageThree');
    },
    slideStage: function () {
        return Session.get('slideStage');
    },
    slideTwoStage: function () {
        return Session.get('slideTwoStage')
    },
    slideThreeStage: function () {

        return Session.get('slideThreeStage')
    },
    slideOneTimer: function () {
        var startSlideOne = Session.get('startSlideOneTime');
        var slideOneTime = (Chronos.currentTime(1000) - startSlideOne) / 1000;

        return(parseInt(slideOneTime));

    }


});

Template.welcome.onRendered( function(){

    Session.set('welcomeStatus', 'welcomeMain');
    Session.set('slideStage', 'slideOne');
    Session.set('slideTwoStage', 'slideTwoOne');
    Session.set('slideThreeStage', 'slideThreeOne');
    Session.set('startSlideOneTime', Chronos.now());



});

//the welcome page events
Template.welcome.events({

    'click .addHealth': function (e) {
        e.preventDefault();
       Router.go('health');
    },
    'click #clearAll': function (e) {
        e.preventDefault();
        Session.clear();
    },
    // 'click #playIntro': function(e) {
    //     e.preventDefault();
    //     Router.go('timewonksVideo');
    // },
    'click .slideNavBarOne': function (e) {
        e.preventDefault();
        Session.set('slideStage', 'slideOne');
    },
    'click .slideNavBarTwo': function (e) {
        e.preventDefault();
        // Session.set('slideStage', 'slideTwo');
    },
    'click .slideNavBarThree': function (e) {
        e.preventDefault();
        // Session.set('slideStage', 'slideThree');
    },



});
//////////////sign up page events////////////
Template.signup.helpers({
    signStatus: function() {
      return Session.get('signStatus');
    },
    email: function() {
        return Session.get('signup-email');
    },
    firstName: function() {
        return Session.get('signup-firstname');
    },
    lastName: function() {
        return Session.get('signup-lastname');
    },
    phone: function() {
        return Session.get('signup-phone');
    },
    signEditz: function() {
        return Session.get('signEditz');
    },
    signError: function() {
        return Session.get('signError');
    },
    signFirst: function() {
        return Session.get('signFirst');
    },
    signLast: function() {
        return Session.get('signLast');
    },
    signPhone: function() {
        return Session.get('signPhone');
    },
    pwdError: function () {
        return Session.get('pwdError');
    }
});

Template.signup.onRendered( function() {
    Session.set('signStatus', 'email');
    Session.set('signEditz', '');
    Session.set('pwdError', '')
});

Template.signup.events({

    'click #signEmail': function(e) {
        e.preventDefault();
        var emailVar = $('#email').val();

      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (re.test(emailVar)) {
           Session.set('signup-email', emailVar);
           Session.set('signStatus', 'names');
       } else {
           Session.set('signError', 'email');
       }

    },
    'click #signNames': function(e) {
      e.preventDefault();
        var firstVar = $('#first-name').val();
        var lastVar  = $('#last-name').val();
        var phone =  $('#phone').val();

        var ph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if ((firstVar !=='') && (lastVar !=='') && (ph.test(phone))) { //ggg
            Session.set('signup-firstname', firstVar);
            Session.set('signup-lastname', lastVar);
            Session.set('signup-phone', phone);
            Session.set('signStatus', 'password');
        } else {
            if ((firstVar =='') && (lastVar !=='') && (ph.test(phone))) { //bgg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar =='') && (ph.test(phone))) {//gbg
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar !=='') && !(ph.test(phone))) {//ggb
                Session.set('signFirst', '');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar =='') && (ph.test(phone))) { //bbg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar !=='') && !(ph.test(phone))) { //bgb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar !=='') && (lastVar =='') && !(ph.test(phone))) { //gbb
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
            else
            if ((firstVar =='') && (lastVar =='') && !(ph.test(phone))) { ///bbb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
        }

    },
    'click #signEmailEditz': function(e) {
      e.preventDefault();
        var emailVar = $('#email').val();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailVar)) {
            Session.set('signup-email', emailVar);
            Session.set('signStatus', 'names');
            Session.set('signEditz', '');
        } else {
            Session.set('signError', 'email');
        }
    },
    'click #signNamesEditz': function(e) {
        e.preventDefault();
        var firstVar = $('#first-name').val();
        var lastVar  = $('#last-name').val();
        var phone =  $('#phone').val();

        var ph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if ((firstVar !=='') && (lastVar !=='') && (ph.test(phone))) { //ggg
            Session.set('signup-firstname', firstVar);
            Session.set('signup-lastname', lastVar);
            Session.set('signup-phone', phone);
            Session.set('signStatus', 'password');
            Session.set('signEditz', '');
        } else {
            if ((firstVar =='') && (lastVar !=='') && (ph.test(phone))) { //bgg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar =='') && (ph.test(phone))) {//gbg
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar !=='') && !(ph.test(phone))) {//ggb
                Session.set('signFirst', '');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar =='') && (ph.test(phone))) { //bbg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar !=='') && !(ph.test(phone))) { //bgb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar !=='') && (lastVar =='') && !(ph.test(phone))) { //gbb
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
            else
            if ((firstVar =='') && (lastVar =='') && !(ph.test(phone))) { ///bbb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
        }
    },
    'click #edit-email': function(e) {
      e.preventDefault();
        Session.set('signEditz', 'email');
    },
    'click #edit-names': function(e) {
        e.preventDefault();
        Session.set('signEditz', 'names');
    },
    'click #signback': function(e) {
        e.preventDefault();
        Session.set('signEditz', '');
    },
    'submit form': function(e, t) { //for registering to the app
        e.preventDefault();
        // Retrieve the input field values
        var email = Session.get('signup-email'),
            firstName = Session.get('signup-firstname'),
            lastName = Session.get('signup-lastname'),
            phone = Session.get('signup-phone'),
            password = $('#pword').val(),
            passwordAgain = $('#pwordagain').val();
        // Trim Helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
               Session.set('pwdError', 'missmatch')
            }
        }

        var userData = Session.get('newUserData');
        //we get the ids of meals picked by user in the preview section
        var pickedBreakfastIdsArray = Session.get('pickedBreakfastIdsArray');
        var pickedSnackOneIdsArray  = Session.get('pickedSnackOneIdsArray');
        var pickedLunchIdsArray     = Session.get('pickedLunchIdsArray');
        var pickedSnackTwoIdsArray  = Session.get('pickedSnackTwoIdsArray');
        var pickedDinnerIdsArray    = Session.get('pickedDinnerIdsArray');
        var eventPropertiesArray    = Session.get('eventPropertiesArray');
        var userStatus                = 'Online';

        //we get the ids of any exercises picked by the user in the preview section
        var pickedExerciseEventIdsArray  =  Session.get('pickedExerciseEventIdsArray');
        var userGym =  Session.get('gymTitle') + Session.get('gymCity') ;

        var userDataGrp = $.extend(userData,{'profile.phone': phone},
            {'profile.providerId': "u36T6ucX9JYja2awb", 'profile.providerFirstName': "Daudi", 'profile.providerLastName': "Sagala"}
            );

        var message = {

                subject: "A new user joined TimeWonks!",
                sender: {
                    _id: 'NA',
                    firstName: 'TimeWonks',
                    lastName: 'Support'
                },
                parent: {
                    _id: 'NA',
                    subject: 'NA'
                },
                recipients:   [{   ///we add recipient
                    _id: "u36T6ucX9JYja2awb",
                    firstName: "Daudi",
                    lastName: "Sagala"

                /*    for testing in localhost
                          _id:"F4QYxbK9gRusqhQ37",
                    firstName: "daudiz",
                     lastName: "admin"
                     */
                }]

        }

        // If validation passes, supply the appropriate fields to the
        // Accounts.createUser function.

        if (isValidPassword(password, passwordAgain)) {
            Accounts.createUser({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                roleid: 5

            }, function() {

                Meteor.call('editNewUser', userDataGrp, pickedBreakfastIdsArray, pickedSnackOneIdsArray, pickedLunchIdsArray,
                    pickedSnackTwoIdsArray, pickedDinnerIdsArray, pickedExerciseEventIdsArray, userGym, eventPropertiesArray, userStatus );

                Meteor.call('sendMessage', message);

                Router.go('overViewPage', {q: 'main'});
                Bert.alert( 'You have signed up successfully!', 'info', 'fixed-top' );

            });
        }
        return false;
    }
});


Template.login.helpers({
    loginError: function() {
      return Session.get('loginError');
    },
    pwdError: function() {
        return Session.get('pwdError');
    },
});

Template.login.onRendered( function() {
    Session.set('pwdError', '');
    Session.set('loginError', '');
});

Template.login.events({ //for loggin in
     'click #login-password': function(e) {
       e.preventDefault();
         var emailVar = $('#login-email').val();
         var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if (re.test(emailVar)) {
             Session.set('loginError', '');
         } else {
             Session.set('loginError', 'login');
         }
     },
    'click #forgot-password': function(e) {
      e.preventDefault();
        Router.go('forgotPwd');
    },
    'submit form': function (e, t) {
        e.preventDefault();

        // Getting values from fields on page
           var email = $('#login-email').val(),
            password = $('#login-password').val();
           var userStatus = 'Online';
           var formerUrl = Session.get('formerUrl');

        if (password !== '') {

            // Calling the loginWithPassword function on the user
            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    Session.set('pwdError', 'pwd');
                } else {

                 if ( formerUrl )  {
                     Router.go(formerUrl);
                     Session.clear('formerUrl');
                 }  else {

                     Router.go('overViewPage', {q: 'main'});
                 }
                    Session.set('pwdError', '');
                    Meteor.call('setUserStatus', userStatus);
                }
            });

        } else {
            Session.set('pwdError', 'login');
        }

    }

});
////////////////////////////////////we add code for forgotten passwords//////////////////////////////////////////////
Template.forgotPwd.helpers({
     resetPwdError: function() {
         return Session.get('resetPwdError');
     },
    currentUser: function() {
        return Meteor.users.findOne({_id:Meteor.userId()});
    },
});

Template.forgotPwd.onRendered( function() {
    Session.set('resetPwdError', '');
});

Template.forgotPwd.events({
    'click .closePwd': function(e) {
        e.preventDefault();
     if (Meteor.userId()) {
         Router.go('account');
     } else {
         Router.go('login');
     }
    },
  'submit form': function(e) {
      var emailV = $('#resetPwdEmail').val();
      // Trim Helper
      var trimInput = function (val) {
          return val.replace(/^\s*|\s*$/g, "");
      }
      var emailVar = trimInput(emailV);
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(emailVar)) {
          Accounts.forgotPassword({email: email}, function(err) {
              if (err) {
                  Bert.alert( err.reason, 'danger' );
              } else {
                  Session.set('resetPwdError', 'none');
                  // Bert.alert({
                  //     type: 'success',
                  //     style: 'fixed-top',
                  //     title: 'Check Your Email',
                  //     message: `Password reset link sent to  ${ emailVar } !`,
                  //     hideDelay: 20000,
                  // });
              }
          });
          Session.set('resetPwdError', 'none');
      } else {
          Session.set('resetPwdError', 'pwd');
      }
   },

});

Template.resetPwd.helpers({

});

Template.resetPwd.onCreated(function() {
    if (Accounts._resetPasswordToken) {
        Session.set('RESET_PASSWORD', Accounts._resetPasswordToken);
    }
});

Template.resetPwd.onRendered( function() {

});

Template.resetPwd.events({
    'submit form': function(e) {
        e.preventDefault();
        var password = $('#password').val(),
            passwordAgain = $('#password-again').val();

        // Check password is at least 6 chars long
        var isValidPassword = function (pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
                Bert.alert("Sorry, It seems the passwords do not match", 'danger', 'fixed-top');
            }
        }
        // If validation passes, supply the appropriate fields to the
        if (isValidPassword(password, passwordAgain)) {
            Accounts.resetPassword(Session.get('RESET_PASSWORD'), password, function(err) {
                if (err) {
                    Bert.alert('We are sorry but something went wrong.', 'danger', 'fixed-top');
                } else {
                    Bert.alert('Your password has been changed. Welcome back!', 'success', 'fixed-top');
                    Session.set('RESET_PASSWORD', null);
                }
            });
        }
    }
});

Template.help.helpers({
    contactUs: function() {
       return Session.get('contactUs');
    },
    contactMsg: function() {
      return Session.get('contactMsg');
    },
    contactEmail: function() {
        return Session.get('contactEmail');
    },
    contactPhone: function() {
        return Session.get('contactPhone');
    },
    contactError: function() {
      return Session.get('contactError');
    },
    contactPh: function() {
        return Session.get('contactPh');
    },
    contactEm: function() {
        return Session.get('contactEm');
    },
    human: function() {
        return Session.get('human');
    }
});

Template.help.onRendered( function() {
     Session.set('contactUs', 'message');
     Session.set('human', 'false');
});

Template.help.events({
    'click #addMessage': function(e) {
           e.preventDefault();
      var contactMessage = $('#contactMessage').val();
     if (contactMessage !=='') {
         Session.set('contactMsg', contactMessage);
         Session.set('contactUs', 'contacts');
             } else
         {
             Session.set('contactError', 'message');
         }
       },
    'click #editMsg': function(e) {
       e.preventDefault();
        Session.set('contactUs', 'editMsg');
        Session.set('contactEmail', $('#contactEmail').val());
        Session.set('contactPhone', $('#contactPhone').val());
    },
    'click #signback': function(e) {
        e.preventDefault();
        Session.set('contactUs', 'contacts');
    },
    'click #human': function(e) {
        e.preventDefault();
        Session.set('human', 'true');
    },
    'submit form': function(e) {
        e.preventDefault();

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        var contEm = $('#contactEmail').val();
        var contPh = $('#contactPhone').val();

     if (Session.get('human') == 'true') {
        if ((re.test(contEm)) && (ph.test(contPh))) {
            var message = {
                sender: {
                    email: $('#contactEmail').val(),
                    phone: $('#contactPhone').val()
                },
                subject: Session.get('contactMsg'),
                recipients: [{    ///we need admin as recipient
                    _id: "xRpLpw4jYDmAMtbmK",
                    firstName: "Daudi",
                    lastName: "Sagala"
                }]
            }
            Meteor.call('sendMessage', message);
            Bert.alert('Message sent!', 'info', 'fixed-top');
            $('#contactMessage').val('');
            Session.set('contactEm', '');
            Session.set('contactPh', '');
            Session.set('contactUs', 'message');
            Session.set('contactError', '');
            history.back();

        } else {
            if (!(re.test(contEm)) && (ph.test(contPh))) {
                Session.set('contactEm', 'email');
                Session.set('contactPh', '');
            } else if ((re.test(contEm)) && !(ph.test(contPh))) {
                Session.set('contactPh', 'phone');
                Session.set('contactEm', '');
            } else if (!(re.test(contEm)) && !(ph.test(contPh))) {
                Session.set('contactEm', 'email');
                Session.set('contactPh', 'phone');
            }
         }
      } else {
        if (!(re.test(contEm)) && (ph.test(contPh))) {
            Session.set('contactEm', 'email');
            Session.set('contactPh', '');
        } else if ((re.test(contEm)) && !(ph.test(contPh))) {
            Session.set('contactPh', 'phone');
            Session.set('contactEm', '');
        } else if (!(re.test(contEm)) && !(ph.test(contPh))) {
            Session.set('contactEm', 'email');
            Session.set('contactPh', 'phone');
        }
          Session.set('human', 'check');
     }
    },
});


////////////////////////
///terms helpers////
Template.terms.helpers({

});

Template.terms.onRendered( function () {

});

Template.terms.events({

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
    //javaScript for templates for service provider
//we start with the welcome page
Template.welcomeSP.helpers ({

});

Template.welcomeSP.onRendered(() => {

});

//the welcome page events
Template.welcomeSP.events({


});
//////////////sign up page events////////////
Template.signupSP.helpers({
signStatus: function() {
    return Session.get('signStatus');
},
email: function() {
    return Session.get('signup-email');
},
firstName: function() {
    return Session.get('signup-firstname');
},
phone: function() {
   return Session.get('signup-phone');
},
lastName: function() {
    return Session.get('signup-lastname');
},
signEditz: function() {
    return Session.get('signEditz');
},
signError: function() {
    return Session.get('signError');
},
signFirst: function() {
    return Session.get('signFirst');
  },
  signLast: function() {
    return Session.get('signLast');
  },
  signPhone: function() {
    return Session.get('signPhone');
  },
  pwdError: function () {
     return Session.get('pwdError');
  },
});

Template.signupSP.onRendered( function() {

    Session.set('signStatus', 'email');
    Session.set('signEditz', '');
    Session.set('pwdError', '');

});

Template.signupSP.events({

    'click #signEmail': function(e) {
        e.preventDefault();
        var emailVar = $('#email').val();

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailVar)) {
            Session.set('signup-email', emailVar);
            Session.set('signStatus', 'names');
        } else {
            Session.set('signError', 'email');
        }

        // if (emailVar !== '') {
        //     Session.set('signup-email', emailVar);
        //     Session.set('signStatus', 'names');
        //     }
    },
    'click #signNames': function(e) {
        e.preventDefault();
        var firstVar = $('#first-name').val();
        var lastVar  = $('#last-name').val();
        var phone =  $('#phone').val();

        var ph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if ((firstVar !=='') && (lastVar !=='') && (ph.test(phone))) { //ggg
            Session.set('signup-firstname', firstVar);
            Session.set('signup-lastname', lastVar);
            Session.set('signup-phone', phone);
            Session.set('signStatus', 'password');
        } else {
            if ((firstVar =='') && (lastVar !=='') && (ph.test(phone))) { //bgg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar =='') && (ph.test(phone))) {//gbg
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar !=='') && !(ph.test(phone))) {//ggb
                Session.set('signFirst', '');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar =='') && (ph.test(phone))) { //bbg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar !=='') && !(ph.test(phone))) { //bgb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar !=='') && (lastVar =='') && !(ph.test(phone))) { //gbb
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
            else
            if ((firstVar =='') && (lastVar =='') && !(ph.test(phone))) { ///bbb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
        }

    },
    'click #signEmailEditz': function(e) {
        e.preventDefault();
        var emailVar = $('#email').val();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailVar)) {
            Session.set('signup-email', emailVar);
            Session.set('signStatus', 'names');
        } else {
            Session.set('signError', 'email');
        }
    },
    'click #signNamesEditz': function(e) {
        e.preventDefault();
        var firstVar = $('#first-name').val();
        var lastVar  = $('#last-name').val();
        var phone =  $('#phone').val();

        var ph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if ((firstVar !=='') && (lastVar !=='') && (ph.test(phone))) { //ggg
            Session.set('signup-firstname', firstVar);
            Session.set('signup-lastname', lastVar);
            Session.set('signup-phone', phone);
            Session.set('signStatus', 'password');
        } else {
            if ((firstVar =='') && (lastVar !=='') && (ph.test(phone))) { //bgg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar =='') && (ph.test(phone))) {//gbg
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', '');
            } else
            if ((firstVar !=='') && (lastVar !=='') && !(ph.test(phone))) {//ggb
                Session.set('signFirst', '');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar =='') && (ph.test(phone))) { //bbg
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar =='') && (lastVar !=='') && !(ph.test(phone))) { //bgb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', '');
                Session.set('signPhone', 'phone');
            } else
            if ((firstVar !=='') && (lastVar =='') && !(ph.test(phone))) { //gbb
                Session.set('signFirst', '');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
            else
            if ((firstVar =='') && (lastVar =='') && !(ph.test(phone))) { ///bbb
                Session.set('signFirst', 'first-name');
                Session.set('signLast', 'last-name');
                Session.set('signPhone', 'phone');
            }
        }
    },
    'click #edit-email': function(e) {
        e.preventDefault();
        Session.set('signEditz', 'email');
    },
    'click #edit-names': function(e) {
        e.preventDefault();
        Session.set('signEditz', 'names');
    },
    'click #signback': function(e) {
        e.preventDefault();
        Session.set('signEditz', '');
    },
    'submit form': function(e, t) { //for registering to the app
        e.preventDefault();
        // Retrieve the input field values
        var email = Session.get('signup-email'),
            firstName = Session.get('signup-firstname'),
            lastName = Session.get('signup-lastname'),
            password = $('#password').val(),
            passwordAgain = $('#password-again').val();
        // Trim Helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);
        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
                Session.set('pwdError', 'missmatch');
            }
        }
        // If validation passes, supply the appropriate fields to the
        // Accounts.createUser function.
        if (isValidPassword(password, passwordAgain)) {
            Accounts.createUser({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                roleid: 4
            }, function(error) {
                if (error) {
                    console.log("Sorry: " + error.reason);
                } else {
                    Router.go('indexPage');
                    Bert.alert( 'You have signed up successfully!', 'info', 'fixed-top' );
                }
            });
        }
        return false;
    }
});
Template.loginSP.helpers({
    loginError: function() {
        return Session.get('loginError');
    },
    pwdError: function() {
        return Session.get('pwdError');
    },
});

Template.loginSP.onRendered( function() {
    Session.set('pwdError', '');
    Session.set('loginError', '');
})

Template.loginSP.events({ //for loggin in
    'click #login-password': function(e) {
        e.preventDefault();
        var emailVar = $('#login-email').val();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailVar)) {
            Session.set('loginError', '');
        } else {
            Session.set('loginError', 'login');
        }
    },
    'submit form': function (e, t) {
        e.preventDefault();

        // Getting values from fields on page
        var email = $('#login-email').val(),
            password = $('#login-password').val();
        // Calling the loginWithPassword function on the user
        if (password !== '') {

            // Calling the loginWithPassword function on the user
            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    Session.set('pwdError', 'pwd');
                } else {
                    Bert.alert({
                        type: 'info',
                        style: 'fixed-top',
                        message: 'Logging in....',
                        hideDelay: 3000,
                    });
                    Router.go('indexPage');
                    Session.set('pwdError', '');
                }
            });

        } else {
            Session.set('pwdError', 'login');
        }
    }

});

Template.helpSP.helpers({
    contactUs: function() {
        return Session.get('contactUs');
    },
    contactMsg: function() {
        return Session.get('contactMsg');
    },
    contactEmail: function() {
        return Session.get('contactEmail');
    },
    contactPhone: function() {
        return Session.get('contactPhone');
    },
    contactError: function() {
        return Session.get('contactError');
    },
    contactPh: function() {
        return Session.get('contactPh');
    },
    contactEm: function() {
        return Session.get('contactEm');
    },
    human: function() {
        return Session.get('human');
    }
});

Template.helpSP.onRendered( function() {
    Session.set('contactUs', 'message');
    Session.set('human', 'false');
});

Template.helpSP.events({
    'click #addMessage': function(e) {
        e.preventDefault();
        var contactMessage = $('#contactMessage').val();
        if (contactMessage !=='') {
            Session.set('contactMsg', contactMessage);
            Session.set('contactUs', 'contacts');
        } else
        {
            Session.set('contactError', 'message');
        }
    },
    'click #editMsg': function(e) {
        e.preventDefault();
        Session.set('contactUs', 'editMsg');
        Session.set('contactEmail', $('#contactEmail').val());
        Session.set('contactPhone', $('#contactPhone').val());
    },
    'click #signback': function(e) {
        e.preventDefault();
        Session.set('contactUs', 'contacts');
    },
    'click #human': function(e) {
        e.preventDefault();
        Session.set('human', 'true');
    },
    'submit form': function(e) {
        e.preventDefault();



        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ph = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        var contEm = $('#contactEmail').val();
        var contPh = $('#contactPhone').val();

        if (Session.get('human') == 'true') {
            if ((re.test(contEm)) && (ph.test(contPh))) {
                var message = {
                    sender: {
                        email: $('#contactEmail').val(),
                        phone: $('#contactPhone').val()
                    },
                    subject: Session.get('contactMsg'),
                    recipients: [{    ///we need admin as recipient
                        _id: "xRpLpw4jYDmAMtbmK",
                        firstName: "Daudi",
                        lastName: "Sagala"
                    }]
                }
                Meteor.call('sendMessage', message);
                Bert.alert('Message sent!', 'info', 'fixed-top');
                $('#contactMessage').val('');
                Session.set('contactEm', '');
                Session.set('contactPh', '');
                Session.set('contactUs', 'message');
                Session.set('contactError', '');

            } else {
                if (!(re.test(contEm)) && (ph.test(contPh))) {
                    Session.set('contactEm', 'email');
                    Session.set('contactPh', '');
                } else if ((re.test(contEm)) && !(ph.test(contPh))) {
                    Session.set('contactPh', 'phone');
                    Session.set('contactEm', '');
                } else if (!(re.test(contEm)) && !(ph.test(contPh))) {
                    Session.set('contactEm', 'email');
                    Session.set('contactPh', 'phone');
                }
            }
        } else {
            if (!(re.test(contEm)) && (ph.test(contPh))) {
                Session.set('contactEm', 'email');
                Session.set('contactPh', '');
            } else if ((re.test(contEm)) && !(ph.test(contPh))) {
                Session.set('contactPh', 'phone');
                Session.set('contactEm', '');
            } else if (!(re.test(contEm)) && !(ph.test(contPh))) {
                Session.set('contactEm', 'email');
                Session.set('contactPh', 'phone');
            }
            Session.set('human', 'check');
        }
    },
});


////////////login page for admin users///////////////
Template.loginAdmin.events({ //for loggin in

    'submit form': function(e) {
        e.preventDefault();

        // Getting values from fields on page
            var email = $('#login-email').val(),
            password = $('#login-password').val();
        // Calling the loginWithPassword function on the user
        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                // Returning a sweetAlert
                alert(error.reason);
            } else {
                if (Meteor.user().profile.roleid == 1) {
                    Router.go('adminUsers');
                    Bert.alert('You have logged in!', 'info', 'fixed-top');
                } else {
                    Router.go('indexPage');
                    Bert.alert('You have logged in!', 'info', 'fixed-top');
                }
            }
        });
        return false;

    }

});