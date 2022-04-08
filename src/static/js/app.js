(function ($) {


  socket = io("http://localhost:3000");

  //On Status
  socket.on("chat userStatus", function (data) {
    const $chatStatus = $("#chatStatus");
    const username = data.username;
    const status = data.status;
    const text = data.text;
    $chatStatus.append(`<li>Username:${username}, Status:${status}, Update:${text}</li>`);
  });

  //Message Button On Click
  $("#messageButton").on("click", (e) => {
    const $messageVal = $("#messageInput").val();
    e.preventDefault();
    if ($messageVal) {
      var username = localStorage.getItem("username") == null ? "misafir" : localStorage.getItem("username");
      socket.emit("chat message", { username, message: $messageVal });
      $("#messageInput").val("");
    }
  });
  
  //On Message
  socket.on("chat message", function (data) {
    const $messages = $("#messages");
    const username = data.username;
    const message = data.message;
    $messages.append(`<li><strong>${username} :</strong> ${message}</li>`);
    window.scrollTo(0, document.body.scrollHeight);
  });

  $(".register-button").on("click", (e) => {

    e.preventDefault();

    const $registerForm = $(".register-form");

    const email = $registerForm.find(".mail")
      .val();

    const name = $registerForm.find(".name")
      .val();

    const lastname = $registerForm.find(".lastname")
      .val();

    const password = $registerForm.find(".password")
      .val();
    const passwordRepeat = $registerForm.find(".password-repeat")
      .val();

    const language = $registerForm.find(".language")
      .val();

    const country = $registerForm.find(".country")
      .val();

    const payload = {
      data: {
        user: {
          email: email,
          username: name,
          lastname: lastname,
          password: password,
          passwordRepeat: passwordRepeat,
          language: language,
          country: country,
        },
      },
    };

    //console.log(payload);

    const url = "/api/v1/users/createUser";

    $.ajax({
      url,
      method: "post",
      contentType: "application/json",
      data: JSON.stringify(payload),
      statusCode: {
        200: (response) => {

          const username = response.username;
          localStorage.setItem("username", username);
          const status = response.status;
          const text = response.text;
          const data = {
            username,
            status,
            text
          };

          socket.emit("chat userStatus", data);

          setTimeout(() => {

            window.location.replace("/");

          }, 3000);

        },
        401: (xhr) => {

          const response = xhr.responseJSON;

          setTimeout(() => {

            alert(response.text);

          }, 3000);

        },
        403: (xhr) => {

          const response = xhr.responseJSON;

          setTimeout(() => {

            alert(response.text);


          }, 3000);

        },
        500: (xhr) => {

          const response = xhr.responseJSON;

          setTimeout(() => {


            alert(response.text);


          }, 3000);

        },
      },
    });

  });




  $(".login-button").on("click", (e) => {

    e.preventDefault();

    const $loginForm = $(".login-form");

    const email = $loginForm.find(".mail")
      .val();

    const password = $loginForm.find(".password")
      .val();

    const payload = {
      data: {
        user: {
          email: email,
          password: password,
        },
      },
    };

    //console.log(payload);

    const url = "/api/v1/auth";

    $.ajax({
      url,
      method: "post",
      contentType: "application/json",
      data: JSON.stringify(payload),
      statusCode: {
        200: (response) => {
          const username = response.username;
          localStorage.setItem("username", username);
          const status = response.status;
          const text = response.text;
          const data = {
            username,
            status,
            text
          };

          socket.emit("chat userStatus", data);

          setTimeout(() => {

            window.location.replace("/");

          }, 1000);

        },
        401: (xhr) => {

          const response = xhr.responseJSON;

          setTimeout(() => {

            alert(response.text);

          }, 2000);

        },
        403: (xhr) => {

          const response = xhr.responseJSON;

          setTimeout(() => {

            alert(response.text);

          }, 2000);

        },
        500: (xhr) => {

          const response = xhr.responseJSON;

          setTimeout(() => {

            alert(response.text);

          }, 2000);

        },
      },
    });

  });

})(jQuery);
