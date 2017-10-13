ChoiceMaker.controller('ChoiceMakerCtrlHome', ['$scope', function($scope){
		$scope.channels = [
			{
				"name": "中午吃啥",
				"url": "#/lunch"
			},
			{
				"name": "派谁去",
				"url": "#/who"
			}
		];
	}]);