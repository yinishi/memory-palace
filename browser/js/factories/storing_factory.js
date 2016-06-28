module.exports = function($http) {
	return {
		storeObject: function(body){
			return $http.post('/api/items', body)
		},
		retrieveObjects: function(){
			return $http.get('/api/items')
				.then(function(items){
					console.log(items, "items")
					return items.data;
				})
		}
	}

}