var app = require('angular').module('memoryPalace');
 
app.directive('navbar', ["$state",  "authFactory", "$rootScope", "modalFactory", require("./navbar")]);
app.directive('threeModel', ['palacesFactory','$window', 'roomFactory', 'tableFactory', 'objectFactory', 'shelfFactory', '$document', 'storingFactory', require("./threeModel")]);
app.directive('ctrlsModal', ['modalFactory', require("./ctrlModal")]);