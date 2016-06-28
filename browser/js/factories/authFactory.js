'use strict';

module.exports = function ($http, $rootScope) {
  var user = null;
  // $rootScope.isLoggedIn = function () {
  //   return !!me.id;
  // };
  // $rootScope.isAdmin = function () {
  //   return !!me.isAdmin;
  // };
  // $rootScope.isMe = function (user) {
  //   return !!user && (me.id == user.id || me == user);
  // };
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
      .then(setUser)
      .then(this.login(credentials));
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