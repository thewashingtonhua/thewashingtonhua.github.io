var scoreData = {
    labels: ["2009", "2010", "2011", "2012", "2013", "2014"],
    datasets: [
        {
            label: "安徽",
            fillColor: "rgba(220,220,220,0.3)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [610, 600, 587, 601, 552, 557]
        },
        {
            label: "国家线",
            fillColor: "rgba(151,187,205,0.3)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [579, 562, 534, 544, 490, 489]
        }
    ]
};

var genderData = {
    labels: ["2009", "2010", "2011", "2012", "2013", "2014"],
    datasets: [
        {
            label: "Boys",
            fillColor: "rgba(110,110,255,0.75)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [74, 76, 73, 79, 74, 79]
        },
        {
            label: "Girls",
            fillColor: "rgba(255,110,110,0.75)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [12, 11, 13, 9, 12, 6]
        }
    ]
};

window.onload = function(){
	var ctx_scoreTrend = document.getElementById("scoreTrend").getContext("2d");
	var ctx_genderRate = document.getElementById("genderRate").getContext("2d");
	Chart.defaults.global.scaleFontColor = "rgba(255,255,255,1.00)";
	// Chart.defaults.global.scaleBeginAtZero = true;
	Chart.defaults.global.scaleLineColor = "rgba(255,255,255,.5)";

	var scoreTrendLineChart = new Chart(ctx_scoreTrend).Line(scoreData, {
        // responsive: true,
        scaleGridLineColor : "rgba(255,255,255,.05)"
    });
    var genderRateBarChart = new Chart(ctx_genderRate).Bar(genderData, {
        // responsive: true,
        barShowStroke : false,
        scaleGridLineColor : "rgba(255,255,255,.05)"
	});

};