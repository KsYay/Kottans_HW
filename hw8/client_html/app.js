$(document).ready(function(){
    var login = $('#login');
    var signup = $('#signup');
    var list = $('#list');
    var showfull = $('#show-full');
    var loading = $('#loading');
    var token = false;

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    $('.js-signup-button').on('click', function(e) {
        loading.show();
        e.preventDefault();
        var data = {
            data: {
                login: $('#login-signup').val(),
                password: $('#password-signup').val(),
                passwordConfirmation: $('#passwordConfirmation-signup').val()
            }
        };
        $.ajax({
            type: 'POST',
            url: 'http://api.sudodoki.name:8888/signup',
            data: data
        }).done (function(response) {
            loading.hide();
            token = response['token'];
            mainRoute();
        }).fail (function(response) {
            $('.error').show();
        });
    });

    $('.js-login-button').on('click', function(e) {
        loading.show();
        e.preventDefault();
        var data = {
            data: {
                login: $('#login-login').val(),
                password: $('#password-login').val(),
            }
        };        
        $.ajax({
            type: 'POST',
            url: 'http://api.sudodoki.name:8888/login',
            data: data
        }).done (function(response) {
            loading.hide();
            token = JSON.parse(response).token;
            mainRoute();
        }).fail (function(response) {
            $('.error').show();
        });
    });

    var loginRoute = function() {
        login.show();
        signup.hide();
        list.hide();
        showfull.hide();
        $('.error').hide();
        loading.hide();
    };

    var signupRoute = function() {
        signup.show();
        login.hide();
        list.hide();
        showfull.hide();
        $('.error').hide();
        loading.hide();
    };

    var listRoute = function() {
        if(token) {
            loading.show();
            $.ajax({
                type: 'GET',
                url: 'http://api.sudodoki.name:8888/users',
                headers: {
                    "SECRET-TOKEN": token,
                }
            }).done(function(data) { 
                loading.hide();
                login.hide();
                signup.hide();
                list.html('');
                showfull.hide();
                var str = '<ul class="small-block-grid-3">';
                data.forEach(function(user) {
                    str += '<li><div class=';
                    if(user['user']['gender'] == 'male')
                        str += '"person male">';
                    else str += '"person female">';
                    str += '<a class="url n" href="#show-full/';
                    str += user['id'] + '"><i>';                    
                    str += user['user']['name']['title'].capitalize() + '.</i>';
                    str += user['user']['name']['first'].capitalize() + user['user']['name']['last'].capitalize();
                    str += '</a></div></li>';
                });
                str += '</ul>';
                list.append(str);
                list.show();
            }).fail (function(response) {
                console.log("List of users wasn't recieved!");
            });
        } 
    };

    var showfullRoute = function(id) {
        loading.show();
        $.ajax({
                type: 'GET',
                url: 'http://api.sudodoki.name:8888/user/' + id,
                headers: {
                    "SECRET-TOKEN": token,
                }
            }).done(function(data) { 
                loading.hide();
                list.hide();
                showfull.html('');
                data = JSON.parse(data)[0];
                // debugger;
                var str = '<h2>' + data['user']['name']['title'].capitalize() + '. ' + data['user']['name']['first'].capitalize() + ' ' + data['user']['name']['last'].capitalize();
                str += '</h2><section><h3>Location</h3>';
                str += data['user']['location']['street'].capitalize() + ', ' + data['user']['location']['city'].capitalize() + ', ' + data['user']['location']['state'].capitalize() + ', ' + data['user']['location']['zip'];
                str += '</section><section><h3>Connect with him!</h3><a href="mailto:';
                str += data['user']['email'] + '">' + data['user']['email'] + '</a><br/><a href="tel:';
                str += data['user']['phone'] + '">' + data['user']['phone'] + '</a></section>';
                showfull.append(str);
                showfull.show();
            }).fail (function(response) {
                console.log("Information about user wasn't recieved!");
            });
    }
    
    var mainRoute = function() {
        if(token) listRoute()
            else loginRoute();
    };

    mainRoute();

    var routes = {
        '/': mainRoute,
        '/login': loginRoute,
        '/signup': signupRoute,
        '/list': listRoute,
        '/show-full/:id': showfullRoute
    };

    var router = Router(routes);
    router.init();
});