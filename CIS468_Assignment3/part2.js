/*
*Joseph Pacitto
*Data Visualization - Assignment 3 - Fall 2018
*Part 2 - Citibike Station Scatterplot
*/

var data = "https://gitcdn.xyz/repo/dakoop/fb4d65af84db0ee3f2233e02cdeb1874/raw/bb31d4c41bda64891455a68741accdfef40aeef3/bikeStationData.json";

Promise.all([d3.csv(data)]).then(processData);

function processData(data)
{
	//remove stations that are in NJ
	var nyStations = data[0].filter(stationFilter);

	var stations = [];
	nyStations.forEach(function(element){
		stations.push([element.availableDocks, element.availableBikes]);
	});

	createGraph(stations);
}

function stationFilter(station)
{
	if(station.district != -999)
	{
		return station;
	}
}

function createGraph(stations)
{
	var width = 800;
	var height = 500;
	var padding = 40;

	var x = max(stations, 0);
	console.log(x);

	var xScale = d3.scaleLinear()
		.domain([0, max(stations, 1)])
		.range([padding, width - padding * 2]);

	var yScale = d3.scaleLinear()
		.domain([0, max(stations, 0)])
		.range([height - padding, padding]);

	var xAxis = d3.axisBottom().scale(xScale).ticks(max(stations, 1) / 5);
	var yAxis = d3.axisLeft().scale(yScale).ticks(max(stations, 0) / 5);

	var svg = d3.select("#part2")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.selectAll("circle")
		.data(stations)
		.enter()
		.append("circle")
		.attr("cx", function(d){
			return xScale(d[1]);
		})
		.attr("cy", function(d){
			return yScale(d[0]);
		})
		.attr("r", 2)
		.attr("fill", "green");

	svg.append("g")
			.attr("class", "x axis")	
			.attr("transform", "translate(0," + (height - padding) + ")")
			.call(xAxis);
		
		//y axis
		svg.append("g")
			.attr("class", "y axis")	
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);
}	

function max(stations, x)
{
	var max = 0;
	for(var i = 0; i < stations.length; i++)
	{
		if(parseInt(stations[i][x]) > max)
		{
					console.log(stations[i][x])
			max = parseInt(stations[i][x]);
		}
	}

	return max;
}