'use strict';

module.exports = function ($http) {
  var user = null;
  function toData (response) {
    return response.data;
  }
  function setUser (newUser) {
    user = newUser;
    return user;
  }
  function logoutUser () {
    user = null;
    return user;
  } 
  return {
    getLoggedInUser: function () {
      return $http.get('/auth/me')
      .then(toData)
      .then(setUser);
    },
    signup: function (credentials) {
      return $http.post('/auth/signup', credentials)
      .then(toData)
      .then(setUser);
    },
    login: function (credentials) {
      return $http.post('/auth/login', credentials)
      .then(toData)
      .then(setUser);
    },
    logout: function () {
      return $http.delete('/auth/logout')
      .then(logoutUser);
    }
  }
}