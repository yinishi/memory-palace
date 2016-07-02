var THREE_Text = require('three-text2D')
var Text2D = THREE_Text.Text2D;
var textAlign = THREE_Text.textAlign;

module.exports = function () {
	return function (position, message) {
		var text = new Text2D(message, {align: textAlign.center, font: '30px Arial', fillStyle: '#000000', antialias: true })
		text.material.alphaTest = 0.1;
		text.scale.set(.3, .3, .3);
		console.log("here", position);
		//text.position.set(10, 0, -90);
		text.position.copy( position );
		text.position.addScalar( 3/2 );
		text.position.y += 20;
		// text.visible = false;
		return text
	}
}