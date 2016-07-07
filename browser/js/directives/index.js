var app = require('angular').module('memoryPalace');
 
app.directive('navbar', ["$state",  "authFactory", "$rootScope", "modalFactory", "constantsFactory", require("./navbar")]);
app.directive('threeModel', ['palacesFactory','$window', 'objectFactory', 'storingFactory', 'modalFactory', 'lightFactory', 'messageFactory', 'constantsFactory', require("./threeModel")]);
app.directive('ctrlModal', ['modalFactory', require("./ctrlModal")]);
app.directive('welcomeModal', require('./welcomeModal'));
app.directive('roomIcons', ['modalFactory', require('./roomIcons')]);
app.directive('objCarousel', require('./objCarousel'));
app.directive('messageModal', ['modalFactory', 'objectFactory', require('./messageModal')]);
app.directive('about', ['modalFactory', require('./about')]);
app.directive('loginModal', ['modalFactory', '$rootScope', 'authFactory', 'storingFactory', 'messageFactory', 'objectFactory', 'palacesFactory', 'constantsFactory', require('./loginModal')]);
app.directive('signupModal', ['modalFactory', '$rootScope', 'authFactory', 'constantsFactory', 'storingFactory', require('./signupModal')]);