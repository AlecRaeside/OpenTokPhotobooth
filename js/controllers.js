angular.module('opentokdemo.controllers', []).
controller('Demo', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

  	$scope.streams = [];
	$scope.photos = [];
	$scope.numPhotos = 5;
	$scope.intermediateInstructions = [
		"that was a good one",
		"Work it baby",
		"give me blue steel!",
		"now look straight at the camera",
		"watch out behind you!",
		"now a serious one",
		"you just heard a hilarious joke",
		"show me the gun show",
		"do your best duck face!"
	];

	var session;

	initTB();

  	function initTB() {
	  	TB.addEventListener("exception", exceptionHandler);
		session = TB.initSession("1_MX4zOTE4Mzg1Mn4xMjcuMC4wLjF-V2VkIFNlcCAwNCAwNTo1ODowOSBQRFQgMjAxM34wLjMzMDEyOTAzfg"); // Replace with your own session ID. See https://dashboard.tokbox.com/projects
		//TB.setLogLevel(TB.DEBUG);
		session.addEventListener("sessionConnected", sessionConnectedHandler);
		session.addEventListener("streamCreated", streamCreatedHandler);

		session.connect(39183852, "T1==cGFydG5lcl9pZD0zOTE4Mzg1MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz1hZmU1YzE5NGQyNTc0MWRiYmM5NjQ3ZTNkOGVkZDZhZjUxZTU0ZTgxOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9MV9NWDR6T1RFNE16ZzFNbjR4TWpjdU1DNHdMakYtVjJWa0lGTmxjQ0F3TkNBd05UbzFPRG93T1NCUVJGUWdNakF4TTM0d0xqTXpNREV5T1RBemZnJmNyZWF0ZV90aW1lPTEzNzgyOTk0OTMmbm9uY2U9MC4zODQ5MDk2OTc3NTQxNzQ2JmV4cGlyZV90aW1lPTEzODA4OTE2MDgmY29ubmVjdGlvbl9kYXRhPQ==");
	}
	

	function sessionConnectedHandler(event) {
	    subscribeToStreams(event.streams);
		var myStream = session.publish();
		$scope.streams.push(myStream)

	}

	function streamCreatedHandler(event) {
	    subscribeToStreams(event.streams);
	}

	function subscribeToStreams(streams) {
		streams.forEach(function(stream) {
	        if (stream.connection.connectionId != session.connection.connectionId) {
	            $scope.streams.push(session.subscribe(stream));
	        }

	    });
	}

	function exceptionHandler(event) {
	    alert(event.message);
	}

	$scope.startPhotoBooth = function () {
		$scope.photos = [];
		$scope.instructions = "Strike a pose!";
		for (var i = 0; i < $scope.numPhotos; i++) {
			(function(count) {
				$timeout(function() {
					$scope.takePhoto();
					if (count == $scope.numPhotos - 1) {
						$scope.instructions = "Enjoy your photos!"
					} else {
						var randomIndex = Math.floor(Math.random() * $scope.intermediateInstructions.length);
						$scope.instructions = $scope.intermediateInstructions[randomIndex];
					}
				}, (2000*i)+2000);
			})(i)
		}
	}
	$scope.takePhoto = function() {
		var photos = [];
		
		$scope.streams.forEach(function(stream, i) {
			console.log(stream.id)
			if (!!stream.id) {
				photos.push(stream.getImgData());
			} else {
				delete $scope.streams[i];
			}
		});
		$scope.photos.push(photos);
	}

}]);