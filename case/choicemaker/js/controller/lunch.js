ChoiceMaker.controller('ChoiceMakerCtrlLunch', ['$scope', '$filter', function($scope, filter) {

		$scope.stores = [
			{
				"name": "悠品味精致沙县",
				"location": "南门出去正对面",
				"foods": [
					{
						"name": "黄焖鸡米饭",
						"price": 18
					},
					{
						"name": "蛋炒饭",
						"price": 8
					},
					{
						"name": "香肠炒饭",
						"price": 10
					},
					{
						"name": "鸭腿饭",
						"price": 12
					},
					{
						"name": "红烧狮子头饭",
						"price": 13
					}
				]
			},
			{
				"name": "重庆小面",
				"location": "南门出去左转200米",
				"foods": [
					{
						"name": "重庆小面",
						"price": 15
					},
					{
						"name": "热干面",
						"price": 15
					}					
				]
			},
			{
				"name": "馄饨",
				"location": "南门出去左转100米",
				"foods": [
					{
						"name": "小馄饨（18个）",
						"price": 6
					},
					{
						"name": "小馄饨（26个）",
						"price": 8
					},
					{
						"name": "小馄饨（34个）",
						"price": 10
					},
					{
						"name": "冷馄饨/拌馄饨",
						"price": "原价+1"
					}
				]
			},
			{
				"name": "飚记无水鸡蛋面",
				"location": "南门正对面",
				"foods": [
					{
						"name": "阿布卤肉饭",
						"price": 15
					},
					{
						"name": "酸汤金菇肥牛面",
						"price": 25
					},
					{
						"name": "套餐面25",
						"price": 25
					}
				]
			}
		];

		var makeAChoice = function() {
			var len = $scope.stores.length;
			var choice = Math.floor(Math.random() * len);

			$scope.chosenStore = $scope.stores[choice];
			console.log("choice:" + choice + "  " + $scope.chosenStore.name);
		};

		var init = function() {
			makeAChoice();
		};

		init();

		$("#choose_btn").click( function() {
			$scope.$apply(makeAChoice);
		});

	}]);