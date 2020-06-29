if (localStorage.getItem("mchat_username") != null)
    window.location.href = "main.html";

const url = "http://app.bugcatstudio.ga_/mchat/auth.php";
var allUsers = "";

function fetchUsernames() {
    $.ajax({
        url: url,
        type: "POST",
        data: { fetchUsers: 0 },
        success: function (e) {
            allUsers = JSON.parse(e);
        },
        error: function (e) {
            window.location.href = "error.html";
        }
    });
}

fetchUsernames();

function usernameValidate() {
    let u = $('#signup-user').val();
    let uf = $('#signup-user');
    let e = $('#username-err');
    let b = $('#signup-btn-0');

    b.attr('disabled', true);
    uf.addClass('border-danger');

    if (u.match('^[a-zA_Z0-9_]+$') === null) {
        e.html("Only Alphabet, Digits and<br>Underscore are allowed.");
    } else {
        if (u.match('^.{4,15}$') === null) {
            e.html("Username must be 4 to 15<br>characters long");
        } else {
            if (allUsers.includes(u)) {
                e.html("Username already taken");
            } else {
                e.html("");
                b.attr('disabled', false);
                uf.removeClass('border-danger');
                uf.addClass('border-success');
            }
        }
    }
}

function emailValidate() {
    let u = $('#signup-email').val();
    let uf = $('#signup-email');
    let e = $('#email-err');
    let b = $('#signup-btn-0');

    b.attr('disabled', true);
    uf.addClass('border-danger');

    if (u.match('^([a-zA-Z0-9-._]+)[@]([a-zA-Z0-9]+)[.]([a-zA-Z0-9]{2,4})$') === null) {
        e.html("Enter a Valid Email.");
    } else {
        e.html("");
        b.attr('disabled', false);
        uf.removeClass('border-danger');
        uf.addClass('border-success');
    }
}

function passwordValidate(feild, error, button) {
    let uf = $('#' + feild);
    let u = uf.val();
    let e = $('#' + error);
    let b = $('#' + button);

    b.attr('disabled', true);
    uf.addClass('border-danger');

    if (u.match('^[A-Za-z0-9!@#$%&*]{6,32}$') === null) {
        e.html("Password can have Digits,<br>Alphabets and<br>Symbols (!@#$%&*).<br>Atleast 6 Character Long.");
    } else {
        e.html("");
        b.attr('disabled', false);
        uf.removeClass('border-danger');
        uf.addClass('border-success');
    }
}

function signup_0() {
    let u = $('#signup-user').val();
    let e = $('#signup-email').val();
    let p = $('#signup-pass').val();
    if (u == "")
        $('#username-err').html("Please enter Username.");
    else if (e == "")
        $('#email-err').html("Please enter Email.");
    else if (p == "")
        $('#pass-err').html("Please Create a Password.");
    else
        view('signup-view-2');
}

function textValidate(feild, err, btn, green = true) {
    let uf = $('#' + feild);
    let u = uf.val();
    let e = $('#' + err);
    let b = $('#' + btn);
    b.attr('disabled', true);
    uf.addClass('border-danger');
    if (u.match('^[A-Za-z0-9 ]*$') === null) {
        e.html("Only Alphabets and Numbers<br>are allowed.");
    } else {
        e.html("");
        b.attr('disabled', false);
        uf.removeClass('border-danger');
        if (green)
            uf.addClass('border-success');
    }
}
var signup_allow = true;
var signup_img;

function imageValidate(event) {
    signup_img = document.querySelector('#signup-image').files[0];
    if (signup_img) {
        let f = signup_img['type'];
        if (!(['image/jpeg', 'image/png', 'image/gif'].includes(f))) {
            popup('Select a Valid Image');
            $('#signup-btn').attr("disabled", true);
            signup_allow = false;
        } else {
            $('#signup-btn').attr("disabled", false);
            $('#signup-image-err').html('');
            $('#signup-image-0').css('background-image', 'url(' + URL.createObjectURL(event.target.files[0]) + ')');
            signup_allow = true;
        }
    }
}

function signup() {

    var form = new FormData();

    form.append('signup', 1);
    form.append('username', $('#signup-user').val().toLowerCase());
    form.append('password', $('#signup-pass').val());
    form.append('email', $('#signup-email').val());
    form.append('name', $('#signup-name').val());
    form.append('gender', $('#signup-gender').val());

    if (signup_img)
        form.append('image', signup_img);

    if (signup_allow) {
        let n = $('#signup-name').val();
        if (n == "")
            $('#name-err').html("Please enter Name.");
        else {
            $.ajax({
                type: "POST",
                url: url,
                data: form,
                processData: false,
                contentType: false,
                success: function (e) {
                    if (e) {
                        localStorage.setItem("mchat_username", $('#signup-user').val());
                        localStorage.setItem("mchat_user_name", $('#signup-name').val());
                        window.location.href="main.html";
                    }
                },
                error: function () {
                    popup('Something went Wrong. Unable to connect to the server. Please Try again.');
                    //window.location.href = "error.html";
                }
            });
        }
    }
}

function login() {
    loading(true);
    let uf = $('#login-user');
    let pf = $('#login-pass');
    let u = uf.val().replace(/[|&;$%@"<>()+,]/g, " ").toLowerCase();
    let p = pf.val().replace(/[|;"<>()+,]/g, " ");
    let ue = $('#login-user-err');
    let pe = $('#login-pass-err');
    ue.html('');
    pe.html('');
    uf.removeClass('border-danger');
    pf.removeClass('border-danger');
    if (u == "") {
        ue.html("Please enter Username.");
        uf.addClass('border-danger');
        loading(false);
    }
    else if (p == "") {
        pe.html("Please enter Password.");
        pf.addClass('border-danger');
        loading(false);
    }
    else {
        if (!allUsers.includes(u)) {
            popup("No Account found with this Username. Please Try Again.");
            loading(false);
            //uf.addClass('border-danger');
        } else {
            $.ajax({
                url: url,
                type: "POST",
                data: { u: u, p: p, login: 1 },
                success: function (e) {
                    e = JSON.parse(e);
                    if (e[0] == true) {
                        if (e[2] == 1) {
                            localStorage.setItem('mchat_username', u);
                            localStorage.setItem('mchat_user_name', e[1]);
                            window.location.href="main.html";
                        } else if (e[2] == 2) {
                            popup('This Account has been banned for Voilation. Please contact <a href=\'mailto:bugcatstudio@gmail.com\'>here</a> to reactivate your Account.')
                            loading(false);
                        }
                    } else {
                        popup('Your Password is Incorrect. Please Try Again');
                        //pf.addClass('border-danger');
                        pf.html('');
                        loading(false);
                    }
                },
                error: function () {
                    popup('Something went Wrong. Unable to connect to the server. Please Try again.');
                    //window.location.href = "error.html";
                    loading(false);

                }
            });
        }
    }
}
function reset_0() {
    loading(true);
    let uf = $('#reset-user');
    let u = uf.val().replace(/[|&;$%@"<>()+,]/g, " ").toLowerCase();
    let ue = $('#reset-user-err');
    ue.html('');
    uf.removeClass('border-danger');
    if (u == "") {
        ue.html("Please enter Username.");
        uf.addClass('border-danger');
        loading(false);
    }
    else {
        if (!allUsers.includes(u)) {
            popup("No Account found with this Username. Please Try Again.");
            loading(false);
        }
        else {
            $.ajax({
                type: "POST",
                url: url,
                data: { u: u, reset_mail: 1 },
                success: function (e) {
                    e = JSON.parse(e);
                    if (e[0] == true) {
                        $code = e[1];
                        view('forgot-view-2');
                        loading(false);
                    } else {
                        popup('Something went Wrong. Unable to send you a verification Email. Please Try again.');
                        loading(false);
                    }
                },
                error: function () {
                    popup('Something went Wrong. Unable to connect to the server. Please Try again.');
                    loading(false);
                }
            });
        }
    }
}
function reset() {
    loading(true);
    let cf = $('#reset-code');
    let pf = $('#reset-pass');
    let c = cf.val().replace(/[|&;$%@"<>()+,]/g, " ").toLowerCase();
    let p = pf.val().replace(/[|;"<>()+,]/g, " ");
    let ce = $('#reset-code-err');
    let pe = $('#reset-pass-err');
    ce.html('');
    pe.html('');
    cf.removeClass('border-danger');
    pf.removeClass('border-danger');
    if (c == "") {
        ce.html("Please enter Code.");
        cf.addClass('border-danger');
        loading(false);
    }
    else if (p == "") {
        pe.html("Please enter Password.");
        pf.addClass('border-danger');
        loading(false);
    }
    else {
        $.ajax({
            url: url,
            type: "POST",
            data: { u: $('#reset-user').val(), p: p, reset: 1 },
            success: function (e) {
                e = JSON.parse(e);
                if (e[0] == true) {
                    popup('Your Password has been changed successfully.');
                    view('login-view');
                    loading(false);
                } else {
                    popup('Verification code entered by you is incorrect. Please try again.');
                    loading(false);
                }
            },
            error: function () {
                popup('Something went Wrong. Unable to connect to the server. Please Try again.');
                loading(false);
            }
        });
    }
}