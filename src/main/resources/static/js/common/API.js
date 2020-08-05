var API = {};

API.logout = function logout(callback) {
    Utils.post('/logout', {}, callback);
};
