var auth = (
function authentication () {
    var saveToken = function (token) {
      window.localStorage['cube-sim-token'] = token;
    };

    var getToken = function () {
      return window.localStorage['cube-sim-token'];
    };

    var logout = function() {
      window.localStorage.removeItem('cube-sim-token');
    };
    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);
        //Check if expired
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };
    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser
    };
  })();
