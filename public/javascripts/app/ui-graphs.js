/**
 * Created by abhishekgoray on 7/8/15.
 */


(function ($, angular, _, Highcharts,moment) {

    Highcharts.setOptions({
        lang: {
            loading: ""
        },
        global: {
            timezoneOffset: 5 * 60 + 30
        }
    });

    Highcharts.dateFormats = {
        c: function (timestamp) {
            return moment(timestamp).format("DD/MM/YYYY  HH:mm");
        },
        h: function(timestamp){
            return moment(timestamp).format("HH:mm");
        }
    };


    angular.module('ui-controls',['daterangepicker'])
        .directive("progressValue", ['$timeout', function ($timeout) {
            return {
                restrict: "AC",
                scope: {
                    value: "=",
                    min:"=",
                    max:"="
                },
                template: "",
                link: function (scope, elem, attrs) {

                    var val = scope.value * 100 / scope.max;
                    $(elem).css('width', val + "%");

                    $(elem).removeClass("progress-bar-success").removeClass("progress-bar-warning").removeClass("progress-bar-error");

                    if (val <= 5) {
                        $(elem).addClass("progress-bar-danger");
                    } else if (val <= 25) {
                        $(elem).addClass("progress-bar-warning");
                    } else {
                        $(elem).addClass("progress-bar-success");
                    }
                }
            }
        }])
        .directive("progressBars", ['$timeout', function ($timeout) {
            return {
                templateUrl: "/templates/widgets/progress.html",
                link: function (scope, elem, attrs) {
                    scope.updateData = function(data){
                        scope.$apply(function(){
                            scope.bars = data;
                        })
                    }
                }
            }
        }])
        .directive("uiTabs",['$timeout',function($timeout){
            return {
                templateUrl: "/templates/widgets/tabs.html",
                link: function (scope, elem, attrs) {
                    scope.loading = true;

                    $timeout(function(){
                        scope.loading = false;
                    },2000);
                }
            }
        }])
        .directive("filterMaximise", ['$timeout', function ($timeout) {
            return {
                template: '<a href="#" class="panel-fullscreen js-resize" style="border: none">' +
                    '<span class="maximise ng-isolate-scope theme-maximise"></span></a>',
                link: function (scope, elem, attrs) {
                }
            }
        }])
        .directive("filterDate", ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                template: '<a href="#" class="dropdown-toggle no-border"><span class="theme-filterdd" date-range-picker="" ng-model="date" options="opts"></span></a>',
                link: function (scope, elem, attrs) {

                    scope.date={
                        fromDate:moment().startOf('date'),endDate:moment().endOf('date')
                    };
                }
            }
        }]);


    angular.module('ui-graphs', [])
        .directive('uiSimpleGraph',['$timeout','Chart',function($timeout,Chart){
            return {
                link : function(scope,elem,attrs){
                    console.log("ELEMENT" , $(elem));

                    scope.chart = new Chart({
                        el:$(elem).get(0),
                        xAxis:{
                            categories:scope.categories
                        },
                        yAxis:[{
                            name:scope.yAxisTitle
                        }],
                        tooltipFormatter:scope.tooltipFormatter ? scope.xAxisFormatter: null,
                        xAxisFormatter:scope.xAxisFormatter ? scope.xAxisFormatter : null,
                        series:[]
                    });

                    scope.updateData = function(data){

                        scope.chart.addSeries(data)

                    };

                    $timeout(function(){

                        scope.chart.renderChart();

                    });

                }

            }
        }])
        .directive('uiGraphDatetime',['$timeout','Chart',function($timeout,Chart){
            return {
                link : function(scope,elem,attrs){
                    console.log("ELEMENT" , $(elem));

                    scope.chart = new Chart({
                        el:$(elem).get(0),
                        xAxis:{
                            type:'datetime',
                            opts:{
                                dateTimeLabelFormats:{
                                    millisecond: '%h',
                                    second: '%h',
                                    minute: '%h',
                                    hour: '%h',
                                    day: '%h',
                                    week: '%e. %b',
                                    month: '%b \'%y',
                                    year: '%Y'
                                }
                            }
                        },
                        yAxis:[{
                            name:scope.yAxisTitle
                        }],
                        tooltipFormatter:scope.tooltipFormatter,
                        xAxisFormatter:scope.xAxisFormatter,
                        series:[]
                    });

                    scope.updateData = function(data){

                        scope.chart.addSeries(data)

                    };

                    $timeout(function(){

                        scope.chart.renderChart();

                    });

                }

            }
        }])
        .factory('Chart', ['ChartHelper', function (ChartHelper) {
            function Chart(options) {
                this.el = getEl(options.el);
                this.defProps = {
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        csv: {
                            dateFormat: "%c"
                        }
                    }
                };
                this.options = options;
                this.helper = new ChartHelper();
                this.chart = {};
            }

            Chart.prototype.renderChart = function () {

                var self = this;

                try {

                    self.opts = _.defaults(self.defProps, {
                        chart: {
                            renderTo: self.el,
                            zoomType:'xy'
                        },
                        title: {
                            text: self.options.chartTitle
                        }
                    });

                    self.opts.xAxis = self.helper.generateXAxis(self.options);
                    self.opts.yAxis = self.helper.generateYAxis(self.options);
                    self.opts.legend = self.helper.generateLegend(self.options);
                    self.opts.tooltip = self.helper.generateTootltip(self.options);
                    self.opts.series = self.options.series;

                    self.chart = new Highcharts.Chart(self.opts);
                }
                catch (e) {
                    console.log(e);
                }

            };

            Chart.prototype.updateChart = function (chartType) {
                var self = this;
                self.opts.chart.type = chartType.toLowerCase();
                self.chart = new Highcharts.Chart(self.opts);
            };

            Chart.prototype.updateData = function (series, categories, viewMode) {
                var self = this;
                this.viewMode = viewMode;
                if (categories) {
                    self.chart.xAxis[0].setCategories(categories);
                }
                _.each(series, function (ser, index) {
                    self.chart.series[index].setData(ser.data);
                });
            };

            Chart.prototype.removeSeries = function(){
                var self = this;
                while(self.chart.series.length > 0){
                    self.chart.series[0].remove();
                }
            };

            Chart.prototype.addSeries =function(series){
                var self = this;
                self.removeSeries();
                _.each(series,function(ser){

                    if(ser.data.length === 1){
                        ser.type='column';
                    }
                    self.chart.addSeries(ser);
                    self.chart.reflow();
                })
            };

            function getEl(el) {
                if (_.isString(el)) {
                    return $(el);
                } else if (_.isElement(el)) {
                    return el;
                } else {
                    return {};
                }
            }

            console.log('CHART' , this);

            return Chart;

        }])
        .factory('ChartHelper', function () {
            return function () {
                return {
                    generateXAxis: function (options) {
                        var xAxis = {};
                        if (options.xAxis.type && options.xAxis.type == "datetime") {
                            xAxis.type = "datetime";
                        } else {
                            xAxis.categories = options.xAxis.categories && options.xAxis.categories.length > 0 ? options.xAxis.categories : [];
                        }
                        xAxis.labels = {};
                        xAxis.labels.formatter = options.xAxisFormatter;
                        xAxis.labels.style = {
                            "color": "#000",
                            "font-family": "Roboto-Medium",
                            "font-size": "10pt"
                        };
                        return _.extend(xAxis, options.xAxis.opts);
                    },
                    generateYAxis: function (options) {
                        var yAxes = [];
                        _.each(options.yAxis, function (yAx) {

                            yAx = _.extend({
                                title: {
                                    text: yAx.name,
                                    style: {
                                        "color": "#000",
                                        "font-family": "Roboto-Medium",
                                        "font-size": "10pt"
                                    }
                                },
                                label: {
                                    style: {
                                        "color": "#000",
                                        "font-family": "Roboto-Medium",
                                        "font-size": "10pt"
                                    }
                                }
                            }, yAx.opts);
                            yAx.min = 0;
                            yAxes.push(yAx);
                        });
                        return yAxes;
                    },
                    generateTootltip: function (options) {
                        return  {
                            shared: true,
                            backgroundColor: null,
                            useHTML: true,
                            borderWidth: 0,
                            style: {
                                padding: 0
                            },
                            formatter: options.tooltipFormatter
                        };
                    },
                    generateLegend: function (options) {
                        return _.extend({
                            enabled: true,
                            floating: false,
                            align: 'center',
                            layout: 'horizontal',
                            verticalAlign: 'bottom',
                            symbolRadius: 5,
                            symbolWidth: 10,
                            itemStyle: {
                                color: '#000000',
                                fontSize: "12pt"
                            }
                        }, options.legend ? options.legend : {});
                    }
                }
            }
        });


})(window.$, window.angular, window._, window.Highcharts,window.moment);
