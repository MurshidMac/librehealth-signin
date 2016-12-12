var loginPanel;
$(document).ready(function(){
  loginPanel = document.getElementById('loginFormDiv');
}); 

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

function showPanel() {
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
    document.getElementById("loginForm").reset();
    hidePanel();
}

function login() {
    var username = $("input#uname").val();
    var password = $("input#psw").val();  
    if(username !== "" && password !== "") {
        console.log('test username '+username + ' password '+ password);
        $.ajax({
            type: "POST",
            url: "/ws/rest/v1/session",
            dataType: 'json',
            async: false,
            data: '{}',
            crossDomain: true,
            beforeSend: function (xhr){ 
                xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
            },
            success: function (data){
                if(data.authenticated)
                {
                    console.log('Hello' + " authenticated "+data.authenticated);
                    alert('Login successful');
                }
                 
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " " + thrownError);
            }
        });
    }
}