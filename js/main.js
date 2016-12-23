var loginPanel;
var baseUrl;

$(document).ready(function(){
    setBaseUrl();
    checkAuthentication();
    $('#loginForm').submit(function(event){
        if(this.checkValidity())
        {
            event.preventDefault();
        }
    });
});
function setBaseUrl() {
    baseUrl = window.location.origin + "/" + window.location.pathname.split('/')[1];
}

function checkAuthentication() {
    if (sessionStorage)
    {
        $.ajax({
            url: baseUrl +"/ws/rest/v1/session",
            headers: '{"accept": "application/json"}',
            type: "GET",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                sessionStorage.setItem("authentication", data.authenticated);
                setAuthenticationLabel(data);
            },
            error: function (xhr, ajaxOptions, error) {
                console.log("Checking authentication request failed: "+ xhr.status + " " + error);
            }
        });
    }
}

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

function showPanel() {
    loginPanel = document.getElementById('loginFormDiv');
    loginPanel.style.display='block';
}

function hidePanel() {
    loginPanel.style.display='none';
}

// When the user clicks anywhere outside of the loginPanel, close it
window.onclick = function(event) {
    if (event.target == loginPanel) {
        loginPanel.style.display = "none";
    }
}

function resetAndCloseForm() {
    $("#errorMsg").text("");
    document.getElementById("loginForm").reset();
    hidePanel();
}

function login(onLoginRedirectUrl) {
    
    var username = $("input#uname").val();
    var password = $("input#psw").val();
    if(username !== "" && password !== "") {
        $.ajax({
            type: "GET",
            url: baseUrl +"/ws/rest/v1/session",
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', make_base_auth(username, password));
            },
            success: function (data){
                if(data.authenticated)
                {
                    $("#errorMsg").text("");
                    sessionStorage.setItem("authentication", data.authenticated);
                    setAuthenticationLabel(data);
                    window.location.href = onLoginRedirectUrl;
                }
                else
                {
                    $("#errorMsg").text("Wrong credentials. Try again!");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " " + thrownError);
            }
        });

    }
}

function logout() {

    $.ajax({
        type: "DELETE",
        url: baseUrl +"/ws/rest/v1/session",
        dataType: 'json',
        crossDomain: true,
        contentType: 'application/json',
        success: function (data) {

            sessionStorage.setItem("authentication", false);
            setAuthenticationLabel(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " " + thrownError);
        }
    });
}

function setAuthenticationLabel(data) {
    if(data && data.authenticated)
    {
        $("#welcomeUser").text("Welcome "+ data.user.display + "!");
        $("#authenticationLabel").text("Logout");
        console.log("authentication " + sessionStorage.getItem("authentication"));
    }
    else
    {
        $("#welcomeUser").text("");
        $("#authenticationLabel").text("Login");
        console.log("authentication " + sessionStorage.getItem("authentication"));
    }
}
