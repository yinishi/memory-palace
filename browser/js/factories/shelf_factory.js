module.exports = function() {
  return function() {
    this.container = new THREE.Object3D()
    this.objects = [];

    var numShelves = 3;

    var stepHeight = 0;
    var stepDepth = 0;

    var width = 10;
    var height = 1;
    var length = 10;
    var geomShelf = new THREE.BoxGeometry(width, height, length);
    var matShelf = new THREE.MeshPhongMaterial({color: 0xffffff});

    for (var i = 0; i < numShelves; i++) {
      var shelf = new THREE.Mesh(geomShelf, matShelf);

      shelf.position.set(0, stepHeight, stepDepth);

      stepHeight += 8;
      stepDepth += 10;


      this.container.add(shelf);
      this.objects.push(shelf);
    }

    for (var i = 0; i < numShelves; i++) {
      var shelf = new THREE.Mesh(geomShelf, matShelf);

      shelf.position.set(0, stepHeight, stepDepth);

      stepHeight += 8;
      stepDepth += -10;

      this.container.add(shelf);
      this.objects.push(shelf);
    }

    for (var i = 0; i < numShelves; i++) {
      var shelf = new THREE.Mesh(geomShelf, matShelf);

      shelf.position.set(0, stepHeight, stepDepth);

      stepHeight += -8;
      stepDepth += -10;

      this.container.add(shelf);
      this.objects.push(shelf);
    }

    for (var i = 0; i < numShelves; i++) {

      var shelf = new THREE.Mesh(geomShelf, matShelf);

      shelf.position.set(0, stepHeight, stepDepth);

      stepHeight += -8;
      stepDepth += 10;

      this.container.add(shelf);
      this.objects.push(shelf);
    }

  }
}
