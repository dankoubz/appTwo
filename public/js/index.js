// KEY STROKE FUNCTIONALITY

// key down show the key press
$(document).keydown(function(e) {
    // Up
    if (e.which == 37) {
        $(".b2").removeClass("d-none");
    }
    // Down
    if (e.which == 38) {
        $(".b1").removeClass("d-none");
    }
    // Left
    if (e.which == 39) {
        $(".b4").removeClass("d-none");
    }
    // Right
    if (e.which == 40) {
        $(".b3").removeClass("d-none");
    }
    // "X"
    if (e.which == 88) {
        $(".k-1b").removeClass("d-none");
    }
    // "C"
    if (e.which == 67) {
        $(".k-2b").removeClass("d-none");
    }
    // Enter
    if (e.which == 13) {
        $(".k-3b").removeClass("d-none");
    }
    // "R"
    if (e.which == 82) {
        $(".k-4b").removeClass("d-none");
    }
});

// key up presses add d-none back
$(document).keyup(function(e) {
    if (e.which == 37) {
        $(".b2").addClass("d-none");
    }

    if (e.which == 38) {
        $(".b1").addClass("d-none");
    }

    if (e.which == 39) {
        $(".b4").addClass("d-none");
    }

    if (e.which == 40) {
        $(".b3").addClass("d-none");
    }

    if (e.which == 88) {
        $(".k-1b").addClass("d-none");
    }

    if (e.which == 67) {
        $(".k-2b").addClass("d-none");
    }

    if (e.which == 13) {
        $(".k-3b").addClass("d-none");
    }

    if (e.which == 82) {
        $(".k-4b").addClass("d-none");
    }
});

// LOGIN + ACCOUNT CREATION

$(function() {

    var game = $("<canvas id='game-canvas'></canvas>");
    game.addClass("border rounded");

    if (getCookie("debugger") == "true") {
        $('.account-button').hide();
        $('.logout-button').show();
        $(".game-main").html(game);
        var user = getCookie("username");
        $('.game-user').html(user);
        $('#loading').addClass("d-none");
    } else {
        $('.account-button').show();
        $('.logout-button').hide();
        $(".game-main").html('');
        $('.user-header').hide();
        document.getElementById('navbarCollapse').click();
    }

    $(".create-submit").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var userData = {
            username: $('.create-form').find('input[name="username"]').val(),
            password: $('.create-form').find('input[name="password"]').val()
        };
        // Send the POST request.
        $.ajax("/api/create", {
            type: "POST",
            data: userData
        }).then(
            function() {
                var row = $("<div>");
                row.addClass("create-message");
                row.append("<p>Account created Successfully!</p>");
                $('.create-form').find('input[name="username"]').val("");
                $('.create-form').find('input[name="password"]').val("");
                $(".create-form").html(row);
            }
        );
    });

    $(".login-submit").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var userData = {
            username: $('.login-form').find('input[name="username"]').val(),
            password: $('.login-form').find('input[name="password"]').val()
        };
        // Send the POST request.
        $.ajax("/api/login", {
            type: "POST",
            data: userData
        }).then(
            function(result) {
                $('.create-form').find('input[name="username"]').val("");
                $('.create-form').find('input[name="password"]').val("");
                var row = $("<div>");
                row.addClass("create-message");
                if (result) {
                    setCookie("debugger", true, 1);
                    setCookie("username", userData.username, 1);
                    location.reload();
                } else {
                    row.append("<p>Check your credentials</p>");
                }
                $(".show-message").html(row);
            }
        );
    });

    $(".logout-button").on("click", function(event) {
        setCookie("debugger", false, 1);
        location.reload();
    })

    $(".leader").on("click", function(result) {
        $.ajax("/api/leaderboard", {
            type: "GET",
        }).then(
            function(res) {
                $('.leader-table').html("");
                var content;
                for (i = 0; i < res.length; i++) {
                    content += '<tr><td>' + res[i].username + '</td><td>' +
                        res[i].total_score + '</td></tr>';
                }
                $('.leader-table').append(content);
            }
        );
    });
});

// fucntion to set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// function to get cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
