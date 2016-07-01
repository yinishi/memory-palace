var app = require('angular').module('memoryPalace');
 
app.directive('navbar', ["$state",  "authFactory", "$rootScope", "modalFactory", require("./navbar")]);
app.directive('threeModel', ['palacesFactory','$window', 'roomFactory', 'tableFactory', 'objectFactory', 'shelfFactory', '$document', 'storingFactory', require("./threeModel")]);
app.directive('ctrlModal', ['modalFactory', require("./ctrlModal")]);
app.directive('modal', ['modalFactory', require('./modal')]);
app.directive('roomIcons', ['modalFactory', require('./roomIcons')]);
app.directive('objCarousel', ['modalFactory', require('./objCarousel')]);
app.directive('messageModal', ['modalFactory', 'objectFactory', require('./messageModal')]);
