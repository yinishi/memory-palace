module.exports = function (modalFactory, objectFactory) {
	return {
		restrict: "E", 
		templateUrl: "./browser/js/templates/messageModal.html",
		controller: "roomCtrl"
		// link: function (s,e,a) {
		// 	s.showModal = modalFactory.getMessageModal();
		// 	s.message;
		// }
	}
}