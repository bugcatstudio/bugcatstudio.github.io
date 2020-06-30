view('splash');
localStorage.removeItem('mchat_receiver');
setTimeout(function () {
    $.ajax({
        url: url + 'valid.php',
        type: "POST",
        cache: false,
        success: function (e) {
            if (e == "ALLOW_ACCESS") {
                if (localStorage.getItem("mchat_username") != null)
                    window.location.href = "main.html";
                else
                    view('newStart');
            } else {
                view('no-response');
                $('#valid').html(e);
            }
        },
        error: function () {
            ajax_error();
        }
    });
}, 2200);