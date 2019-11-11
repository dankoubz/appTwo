$(function() {
        if (getCookie("debugger") == "true") {
          $('.account-button').hide();
          $('.logout-button').show();
          var user = getCookie("username");
          $('.show-user').html("<p>Hi, " + user + "</p>");
        } 
      else {
          $('.account-button').show();
          $('.logout-button').hide();
        }

<<<<<<< HEAD

// The API object contains methods for each kind of request we'll make
var API = {
    saveExample: function(example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/examples",
            data: JSON.stringify(example)
        });
    },
    getExamples: function() {
        return $.ajax({
            url: "api/examples",
            type: "GET"
        });
    },
    deleteExample: function(id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
    }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
    API.getExamples().then(function(data) {
        var $examples = data.map(function(example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });
=======
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
>>>>>>> 1b05311314b86e0828d310f36e63a4c1967f0b6a

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
  });

// fucntion to set cookie
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  // function to get cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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
  