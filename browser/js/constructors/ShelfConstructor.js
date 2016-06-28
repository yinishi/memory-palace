function Shelf() {
  this.container = new THREE.Object3D()
  this.objects = [];

  var numShelves = 30;

  for (var i = 0; i < numShelves; i++) {
    var width = Math.random() * 20 + 10;
    var length = Math.random() * 20 + 10;
    var height = 5;
    var color = '0x'+(Math.random()*0xFFFFFF<<0).toString(16);
    var geomShelf = new THREE.BoxGeometry(width, length, height);
    var matShelf = new THREE.MeshLambertMaterial({color});

    var shelf = new THREE.Mesh(geomShelf, matShelf);

    shelf.position.set(Math.random() * 30, Math.random() * 30, Math.random() * 30);
    shelf.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);

    this.container.add(shelf);
    this.objects.push(shelf);
  }
  
  
}

module.exports = Shelf;
