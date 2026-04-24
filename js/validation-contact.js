$(document).ready(function () {
    $("#send_message").click(function (e) {
        e.preventDefault();

        var error = false;
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var message = $("#message").val();

        $("#name,#email,#phone,#message").click(function () {
            $(this).removeClass("error_input");
        });

        if (name.length == 0) {
            error = true;
            $("#name").addClass("error_input");
        } else {
            $("#name").removeClass("error_input");
        }
        if (email.length == 0 || email.indexOf("@") == -1) {
            error = true;
            $("#email").addClass("error_input");
        } else {
            $("#email").removeClass("error_input");
        }
        if (phone.length == 0) {
            error = true;
            $("#phone").addClass("error_input");
        } else {
            $("#phone").removeClass("error_input");
        }
        if (message.length == 0) {
            error = true;
            $("#message").addClass("error_input");
        } else {
            $("#message").removeClass("error_input");
        }

        if (error === false) {
            $("#send_message").attr({ disabled: "true", value: "Enviando..." });
            $("#success_message").hide();
            $("#error_message").hide();

            $.post("contact.php", $("#contact_form").serialize(), function (result) {
                if (result.trim() == "sent") {
                    $("#success_message").fadeIn(500);
                    $("#send_message").attr({ disabled: "true", value: "Enviado" });
                } else {
                    $("#error_message").fadeIn(500);
                    $("#send_message").removeAttr("disabled").attr("value", "Enviar mensaje");
                }
            });
        }
    });
});
