var firebaseConfig = {
    apiKey: "AIzaSyCyaI92YI1WAtnaaKwIJkiU4ToPDJy-6hg",
    authDomain: "mchat-bugcatstudio.firebaseapp.com",
    databaseURL: "https://mchat-bugcatstudio.firebaseio.com",
    projectId: "mchat-bugcatstudio",
    storageBucket: "mchat-bugcatstudio.appspot.com",
    messagingSenderId: "46112448501",
    appId: "1:46112448501:web:f66a228a6dcc363bf78abc",
    measurementId: "G-FEBTS4WKBB"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const store = firebase.storage();
var u = '';
var p = '';
var e = '';
function signup_0() {
    loading(true);
    u = document.querySelector('#s-u').value;
    p = document.querySelector('#s-p').value;
    e = document.querySelector('#s-e').value;
    if (u == "") {
        $('#s-err-1').html('Please enter Username');
        loading(false);
    }
    else if (e == "") {
        $('#s-err-1').html('Please enter Valid Email');
        loading(false);
    }
    else if (p == "") {
        $('#s-err-1').html('Please enter a Password');
        loading(false);
    }
    else {
        db.ref('users/' + u).once('value', function (data) {
            if (data.val() !== null) {
                $('#s-err-1').html("Username already exists.");
                loading(false);
            }
            else {
                view('signup-view-2');
                loading(false);
            }
        });
    }
}
function signup() {
    loading(true);
    let n = document.querySelector('#s-n').value;
    let g = document.querySelector('#s-g').value;
    if (n == "") {
        $('#s-err-2').html('Please enter Your Name');
        loading(false);
    }
    else {
        let i0 = document.querySelector('#s-i').value;
        let i = document.querySelector('#s-i').files[0];
        if (i0 !== "") {
            i2 = u + '.' + i.name.split('.')[1];
            store.ref().child('users/' + i2).put(i);
        }
        i2 = false;
        db.ref('users/' + u).set({
            pass: p,
            name: n,
            email: e,
            gender: g,
            image: i2
        }).then(function () {
            localStorage.setItem('user', u);
            window.location.reload();
        });
    }
}

function login() {
    loading(true);
    u = document.querySelector('#l-u').value;
    p = document.querySelector('#l-p').value;
    if (u == "") {
        $('#l-err').html('Please enter Username');
        loading(false);
    }
    else if (p == "") {
        $('#l-err').html('Please enter a Password');
        loading(false);
    }
    else {
        db.ref('users/' + u).once('value', function (data) {
            if (data.val() == null) {
                $('#l-err').html("Username dosen't exists.");
                loading(false);
            } else {
                if (p == data.val().pass) {
                    localStorage.setItem('user', u);
                    window.location.reload();
                } else {
                    $('#l-err').html("Your Password didn't match");
                    loading(false);
                }
            }
        });
    }
}

function ufetch(u) {
    var ud = "";
    db.ref('users/' + u).on('value', function (data) {
        $('#user-name').html(data.val().name);
    });
}