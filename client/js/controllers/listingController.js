angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
      console.log(response.data);
      console.log('Listings acquired');
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.currentFlower = {};
    $scope.updatedFlower = {};
    $scope.sightings = {};
    $scope.currname = undefined;
    $scope.update = function(toUpdate) {
      Listings.update(toUpdate.genus, toUpdate.species, toUpdate.comname, $scope.currentFlower.genus, $scope.currentFlower.species).then(function(response) {
        console.log(response.data);
        console.log(toUpdate);
        Listings.getAll().then(function(res) {
          $scope.listings = res.data;
        }, function(err) {
          console.log("Error finding flowers.", err);
        });
      }, function(error) {
        console.log('Unable to update', error);
      });
      
    };


    $scope.select = function(flower) {
      Listings.getSpecSighting(encodeURIComponent(flower.comname)).then(function(res) {
        $scope.sightings = res.data;
        console.log(`Found sightings for ${flower.comname}!`);
        console.log(res.data);
      }, function(error) {
        console.log('Unable to find sightings', error);
      });
      $scope.currentFlower.genus = flower.genus;
      $scope.currentFlower.species = flower.species;
      $scope.currentFlower.comname = flower.comname;
      
      $scope.updatedFlower.genus = flower.genus;
      $scope.updatedFlower.species = flower.species;
      $scope.updatedFlower.comname = flower.comname;

      $scope.currname = flower.comname;
      console.log($scope.currentFlower);
    };

    $scope.remove = function(toRem) {
      Listings.delete($scope.currentFlower.comname, toRem.person, toRem.location).then(function(res) {
        console.log(`Successfully deleted ${toRem.name}'s sighting!`);
        Listings.getSpecSighting(encodeURIComponent($scope.currentFlower.comname)).then(function(res) {
          $scope.sightings = res.data;
          console.log(`Found sightings for ${flower.comname}!`);
          console.log(res.data);
        }, function(error) {
          console.log('Unable to find sightings', error);
        });
      }, function(err) {
        console.log('Failed to delete', err);
      });
      
    }

    $scope.add = function(nSight) {
      Listings.addSight($scope.currentFlower.comname, nSight.name, nSight.location).then(function(res) {
        console.log('Successfully added sighting!');
        Listings.getSpecSighting(encodeURIComponent($scope.currentFlower.comname)).then(function(res) {
          $scope.sightings = res.data;
          console.log(`Found sightings for ${flower.comname}!`);
          console.log(res.data);
        }, function(error) {
          console.log('Unable to find sightings', error);
        });
      }, function(err) {
        console.log('Unable to add sighting', err);
      });
    }
  }
]);