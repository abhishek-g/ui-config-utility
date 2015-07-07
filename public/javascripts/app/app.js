(function ($, angular) {


    angular.module('ui-test', [])
        .controller("TestController", ['$scope', function ($scope) {
            $scope.totalPower = 345;
            $scope.totGen = 903432;
            $scope.totalCapacity = 800;
            $scope.todGen = 6723.3;
            $scope.pr = 78.234;
        }])
        .directive("testingDynamicCreation", ['$timeout',
            function ($timeout) {
                return {
                    controller: ['$scope', function ($scope) {
                        console.log("$SCOPE", $scope);
                        $scope.columndefs = [
                            {
                                targets: [0],
                                mData: 'name'
                            },
                            {
                                targets: [1],
                                mData: 'age'
                            },
                            {
                                targets: [2],
                                mData: 'class'
                            },
                            {
                                targets: [3],
                                mData: 'div'
                            }
                        ];
                        $timeout(function () {
                            $scope.data = [
                                {
                                    name: 'XYZ',
                                    age: "21",
                                    class: "7",
                                    div: 'A'
                                },
                                {
                                    name: 'WERXYZ',
                                    age: "22",
                                    class: "7",
                                    div: 'A'
                                },
                                {
                                    name: 'CVBXYZ',
                                    age: "26",
                                    class: "7",
                                    div: 'B'
                                },
                                {
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },
                                {
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },
                                {
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },{
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },{
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },{
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },{
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },{
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                },{
                                    name: 'MNLOXYZ',
                                    age: "25",
                                    class: "7",
                                    div: 'B'
                                }
                            ];
                        }, 8000);
                    }],
                    scope: false,
                    template: '',
                    link: function (scope, elem, attrs) {
                        console.log("$SCOPE1", scope);
                    }
                }
            }])
        .directive("filterMaximise", ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                scope: false,
                template: '<a href="#" class="panel-fullscreen js-resize" style="border: none">' +
                    '<span class="maximise ng-isolate-scope theme-maximise"></span></a>',
                link: function (scope, elem, attrs) {
                    console.log("$SCOPE2", scope);
                }
            }
        }])
        .directive("filterDate", ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                scope: false,
                template: '<a href="#" class="panel-fullscreen js-resize" style="border: none">' +
                    '<span class="maximise ng-isolate-scope theme-maximise"></span></a>',
                link: function (scope, elem, attrs) {
                    console.log("$SCOPE3", scope);
                }
            }
        }])
        .directive("customTable", ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                scope: {
                    columns: '=opts',
                    rows: '=rows',
                    tableid: '@tableid',
                    columndefs:'=columndefs'
                },
                controller: ['$scope', function ($scope) {
                    console.log("$SCOPE4", $scope);
                }],
                templateUrl: '/templates/widgets/testing.html',
                link: function (scope, elem, attrs) {
                    $timeout(function () {
                        var el = $(elem).find('table');
                        var table = el.dataTable({"iDisplayLength": 7, "ordering": false, "info": false, "lengthChange": false, "searching": false,
                            "columnDefs": scope.columndefs});

                        scope.$watch('rows', function (data) {
                            if (!$.isEmptyObject(data)) {
                                table.fnAddData(data);
                            }
                        })

                    })
                }
            }
        }]);

})(window.$, window.angular);