module.exports = function($http) {
	return {
		storeObject: function(body){
			return $http.post('/api/items', body)
		},
		retrieveObjects: function(){
			return $http.get('/api/items')
				.then(function(items){
					return items.data;
				})
		},
		deleteObject: function(id){
			return $http.delete('/api/items/'+ id)
		}
	}

}