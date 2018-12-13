angular.module('listings', []).factory('Listings', function ($http) {
  var methods = {
    getAll: function () {
      return $http.get('http://localhost:3000/api/flowers');
    },

    getSpecSighting: function (comname) {
      return $http.get('http://localhost:3000/api/sightings/' + comname);
    },
    addSight: function(fname, name, loc, date) {
      return $http.post(encodeURI(`http://localhost:3000/api/sightings/${fname}/${name}/${loc}`));
    },
    update: function (ngen, nspe, ncom, ogen, ospe) {
      return $http.put(encodeURI(`http://localhost:3000/api/flowers/${ngen}/${nspe}/${ncom}/${ogen}/${ospe}`));

    },

    delete: function (fname, name, loc) {
      return $http.delete(`http://localhost:3000/api/sightings/${fname}/${name}/${loc}`);
    },

    query: function (q) {
      return $http.get(`http://localhost:3000/api/custom/${q}`);
    }
  };

  return methods;
});
