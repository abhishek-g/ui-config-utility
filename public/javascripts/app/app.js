(function ($, angular, moment) {

    angular.module('ui-test', ['ui-graphs', 'ui-controls'])
        .controller("TestController", ['$scope', function ($scope) {
            $scope.totalPower = 345;
            $scope.totGen = 903432;
            $scope.totalCapacity = 800;
            $scope.todGen = 6723.3;
            $scope.pr = 78.234;
        }])
        .directive("testingDynamicCreation", ['$timeout', function ($timeout) {
            return {
                controller: ['$scope', function ($scope) {
                    //console.log("$SCOPE", $scope);
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
                    $scope.loading = true;
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
                            }
                        ];

                        $scope.loading = false;
                    }, 8000);
                }],
                scope: true,
                template: '',
                link: function (scope, elem, attrs) {
                }
            }
        }])
        .directive("testingProgressBars", ['$timeout', function ($timeout) {
            return {
                controller: ['$scope', function ($scope) {
                    //console.log("$SCOPE", $scope);

                    $scope.loading = true;

                    $timeout(function () {
                        $scope.loading = false;
                        $scope.updateData([
                            {
                                "subject": "Building_E1",
                                "value": 0.74
                            },
                            {
                                "subject": "Building_E2",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_E3",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_F1",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_F2",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_F3",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_H5",
                                "value": 1.11
                            },
                            {
                                "subject": "Building_H6",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_H7",
                                "value": 0
                            },
                            {
                                "subject": "Building_I1",
                                "value": 1.1
                            },
                            {
                                "subject": "Building_I2",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_I3",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_J1",
                                "value": 1.08
                            },
                            {
                                "subject": "Building_J2",
                                "value": 1.04
                            },
                            {
                                "subject": "Building_J3",
                                "value": 0.94
                            }
                        ]);


                    }, 8000);
                }],
                scope: true,
                template: '',
                link: function (scope, elem, attrs) {
                }
            }
        }])
        .directive("testingDynamicCharts", ['$timeout', function ($timeout) {
            return {
                controller: ['$scope', function ($scope) {
                    $scope.loading = true;
                    $scope.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                    $scope.yAxisTitle = "Temperature";

                    $timeout(function () {

                        $scope.$apply(function () {
                            $scope.loading = false;
                        });
                        $scope.updateData([
                            {
                                name: 'Tokyo',
                                type: 'column',
                                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                            },
                            {
                                name: 'New York',
                                type: 'bar',
                                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                            },
                            {
                                name: 'Berlin',
                                type: 'area',
                                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                            },
                            {
                                name: 'London',
                                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                            }
                        ]);

                    }, 5000)

                }],
                scope: true,
                template: '',
                link: function (scope, elem, attrs) {
                }
            }
        }])
        .directive("testingDynamicChartsDateTime", ['$timeout', 'ResponseFormatter', function ($timeout, ResponseFormatter) {
            return {
                controller: ['$scope', function ($scope) {
                    $scope.loading = true;
                    $scope.yAxisTitle = "Active Power (kW)";


                    $scope.tooltipFormatter = function () {
                        return "<b> Time :" + moment(this.x).format("HH:mm") + "<br> Value :" + this.y + "</b>";
                    };

                    $scope.xAxisFormatter = function () {
                        return moment(this.value).format("HH:mm");
                    };

                    $timeout(function () {
                        var formattedData = ResponseFormatter.formatForDateTime([
                            {
                                "_id": {
                                    "ts": "2015-07-07T00:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 26.1499019999992
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T01:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 104.25097600000481
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T02:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 256.59863299999597
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T03:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 391.95019500000126
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T04:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 431.4492190000001
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T05:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 467.9511719999982
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T06:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 487.6005860000023
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T07:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 457.0981439999996
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T08:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 428.2514660000006
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T09:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 410.2998040000002
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T10:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 187.05126999999993
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T11:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 17.449706999998853
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T12:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 19.148925999997118
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T13:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 3.5
                            },
                            {
                                "_id": {
                                    "ts": "2015-07-07T14:30:00.000Z",
                                    "site": "54e59075a6f9fdda23269fe0"
                                },
                                "yield": 0
                            }
                        ], 'yield');
                        $scope.$apply(function () {
                            $scope.loading = false;
                        });
                        $scope.updateData([
                            {
                                name: 'Site_Hyderabad',
                                data: formattedData ? formattedData : [],
                                type: 'column'
                            }
                        ]);

                    }, 5000)

                }],
                scope: true,
                template: '',
                link: function (scope, elem, attrs) {
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
                }
            }
        }])
        .directive("filterDate", ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                scope: false,
                template: '<a href="#" class="dropdown-toggle no-border"><span class="theme-filterdd"></span></a>',
                link: function (scope, elem, attrs) {
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
                    columndefs: '=columndefs'
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
        }])
        .service("ResponseFormatter", ['$filter', function ($filter) {
            return {
                formatForDateTime: function (data, key) {

                    var retData = [];

                    angular.forEach(data, function (point) {
                        retData.push([moment(point['_id']['ts']).unix() * 1000, parseFloat($filter('number')(point[key], 2))])
                    });


                    return retData;
                }
            }
        }]);

})(window.$, window.angular, window.moment);