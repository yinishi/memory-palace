var app = require('angular').module('memoryPalace');
 
app.directive('navbar', ["$state",  "authFactory", "$rootScope", "modalFactory", require("./navbar")]);
app.directive('threeModel', ['textFactory', 'palacesFactory','$window', 'roomFactory', 'objectFactory', 'shelfFactory', '$document', 'storingFactory', 'modalFactory', 'lightFactory', 'messageFactory', require("./threeModel")]);
app.directive('ctrlModal', ['modalFactory', require("./ctrlModal")]);
app.directive('modal', ['modalFactory', require('./modal')]);
app.directive('roomIcons', ['modalFactory', require('./roomIcons')]);
app.directive('objCarousel', ['modalFactory', require('./objCarousel')]);
app.directive('messageModal', ['modalFactory', 'objectFactory', require('./messageModal')]);
app.directive('about', ['modalFactory', require('./about')]);
app.directive('loginModal', ['modalFactory', '$rootScope', 'authFactory', 'storingFactory', 'messageFactory', 'objectFactory', require('./loginModal')]);
app.directive('signupModal', ['modalFactory', '$rootScope', 'authFactory', require('./signupModal')]);
