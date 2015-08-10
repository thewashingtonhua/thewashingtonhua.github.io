var scoreData = {
    labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015"],
    datasets: [
        {
            label: "合工大软件录取线",
            fillColor: "rgba(220,220,220,0.3)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [610, 600, 587, 601, 552, 557, 620]
        },
        {
            label: "安徽理科一本线",
            fillColor: "rgba(151,187,205,0.3)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [579, 562, 534, 544, 490, 489, 555]
        }
    ]
};

var genderData = {
    labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015"],
    datasets: [
        {
            label: "Boys",
            fillColor: "rgba(110,110,255,0.75)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(110,110,255,1)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [74, 76, 73, 79, 74, 79, 76]
        },
        {
            label: "Girls",
            fillColor: "rgba(255,110,110,0.75)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(255,110,110,1)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [12, 11, 13, 9, 12, 6, 12]
        }
    ]
};

var areaData = [
    {
        value: 113,
        color:"#FE7163",
        highlight: "#FF4A38",
        label: "安徽"
    },
    {
        value: 42,
        color: "#FEC763",
        highlight: "#FFB838",
        label: "江苏"
    },
    {
        value: 35,
        color: "#F3F964",
        highlight: "#F6FF38",
        label: "浙江"
    },
    {
        value: 25,
        color: "#5FE180",
        highlight: "#1AFB56",
        label: "河南"
    },
    {
        value: 20,
        color: "#FE7163",
        highlight: "#FF4A38",
        label: "山西"
    },
    {
        value: 19,
        color: "#CC5FE1",
        highlight: "#DB1AFB",
        label: "上海"
    },
    {
        value: 19,
        color: "#5F84E1",
        highlight: "#1A59FB",
        label: "福建"
    },
    {
        value: 18,
        color: "#F3F964",
        highlight: "#F6FF38",
        label: "山东"
    },
    {
        value: 18,
        color: "#FEC763",
        highlight: "#FFB838",
        label: "湖北"
    },
    {
        value: 17,
        color: "#5FE180",
        highlight: "#1AFB56",
        label: "广东"
    },
    {
        value: 17,
        color: "#5F84E1",
        highlight: "#1A59FB",
        label: "辽宁"
    },
    {
        value: 17,
        color: "#CC5FE1",
        highlight: "#DB1AFB",
        label: "河北"
    },
    {
        value: 17,
        color: "#FE7163",
        highlight: "#FF4A38",
        label: "天津"
    },
    {
        value: 17,
        color: "#FEC763",
        highlight: "#FFB838",
        label: "江西"
    },
    {
        value: 17,
        color: "#F3F964",
        highlight: "#F6FF38",
        label: "湖南"
    },
    {
        value: 16,
        color: "#5FE180",
        highlight: "#1AFB56",
        label: "新疆"
    },
    {
        value: 14,
        color: "#5F84E1",
        highlight: "#1A59FB",
        label: "吉林"
    },
    {
        value: 13,
        color: "#CC5FE1",
        highlight: "#DB1AFB",
        label: "黑龙江"
    },
    {
        value: 13,
        color: "#FE7163",
        highlight: "#FF4A38",
        label: "四川"
    },
    {
        value: 12,
        color: "#FEC763",
        highlight: "#FFB838",
        label: "北京"
    },
    {
        value: 11,
        color: "#F3F964",
        highlight: "#F6FF38",
        label: "陕西"
    },
    {
        value: 11,
        color: "#5FE180",
        highlight: "#1AFB56",
        label: "甘肃"
    },
    {
        value: 9,
        color: "#5F84E1",
        highlight: "#1A59FB",
        label: "重庆"
    },
    {
        value: 8,
        color: "#FE7163",
        highlight: "#FF4A38",
        label: "广西"
    },
    {
        value: 8,
        color: "#FEC763",
        highlight: "#FFB838",
        label: "贵州"
    },
    {
        value: 6,
        color: "#CC5FE1",
        highlight: "#DB1AFB",
        label: "内蒙古"
    },
    {
        value: 5,
        color: "#F3F964",
        highlight: "#F6FF38",
        label: "云南"
    },
    {
        value: 2,
        color: "#5FE180",
        highlight: "#1AFB56",
        label: "青海"
    },
    {
        value: 2,
        color: "#5F84E1",
        highlight: "#1A59FB",
        label: "海南"
    },
    {
        value: 2,
        color: "#CC5FE1",
        highlight: "#DB1AFB",
        label: "宁夏"
    },
    {
        value: 2,
        color: "#FE7163",
        highlight: "#FF4A38",
        label: "留学生"
    }
]

window.onload = function(){
	Chart.defaults.global.scaleFontColor = "rgba(255,255,255,1.00)";
	// Chart.defaults.global.scaleBeginAtZero = true;
	Chart.defaults.global.scaleLineColor = "rgba(255,255,255,.5)";
    

    var ctx_scoreTrend = document.getElementById("scoreTrend").getContext("2d");
	var scoreTrendLineChart = new Chart(ctx_scoreTrend).Line(scoreData, {
        // responsive: true,
        scaleGridLineColor : "rgba(255,255,255,.05)"
    });
    

    var ctx_genderRate = document.getElementById("genderRate").getContext("2d");
    var genderRateBarChart = new Chart(ctx_genderRate).Bar(genderData, {
        // responsive: true,
        barShowStroke : false,
        scaleGridLineColor : "rgba(255,255,255,.05)"
	});
    

    var ctx_areaRate = document.getElementById("areaRate").getContext("2d");
    var areaRateDoughnutChart = new Chart(ctx_areaRate).Doughnut(areaData,{
        segmentStrokeWidth : 1,
        // segmentStrokeColor: "#37589D",
        // segmentStrokeColor: "#000",
        percentageInnerCutout : 40,
        segmentStrokeColor: "rgba(255,255,255,0.6)"
    });

};