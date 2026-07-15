$(document).ready(function () {
    $("#btn_newsletter_submit").click(function (e) {
        e.preventDefault();

        var error = false;
        var email = $("#newsletter_email").val();

        $("#newsletter_email").click(function () {
            $(this).removeClass("error_input");
        });

        if (email.length == 0 || email.indexOf("@") == -1) {
            error = true;
            $("#newsletter_email").addClass("error_input");
        } else {
            $("#newsletter_email").removeClass("error_input");
        }

        if (error === false) {
            $("#btn_newsletter_submit").attr({ disabled: "true" }).find("span").text("Enviando...");
            $("#newsletter_success").hide();
            $("#newsletter_error").hide();

            $.post("newsletter.php", $("#newsletter_form").serialize(), function (result) {
                if (result.trim() == "sent") {
                    $("#newsletter_success").fadeIn(500);
                    $("#btn_newsletter_submit").attr({ disabled: "true" }).find("span").text("Suscrito");
                } else {
                    $("#newsletter_error").fadeIn(500);
                    $("#btn_newsletter_submit").removeAttr("disabled").find("span").text("Suscribirme");
                }
            });
        }
    });
});
