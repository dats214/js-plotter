//Generate array of evenly spaced points
function range(start, stop, step) {
	var a = [start], b = start;
	while(b < stop){b += step; a.push(b)}
	return a;
};

/*
// Simple example:
// make a constructor to create a plot object with some default settings
// create a js file with code like this:
myPlot = new Plotter("myPlot");
myPlot.xs = range(-10, 10, 0.1);
myPlot.params = [0, 1];
myPlot.traceFunc = function() {
return [{
  x: myPlot.xs,
  y: myPlot.xs.map(x => myPlot.params[0] + myPlot.params[1]*x*x),
}];
};
// draw the plot and size it correctly. the resizing is still messy but it works
myPlot.initializePlot();
myPlot.resizePlot($( "figure" ).width());

// then make a slider.js file with something like this:
// addSlider([myPlot], "y-intercept", 0, [0, 10, 0.1]);
// addSlider([myPlot], "curvature", 1, [-5, 5, 0.1]);
*/
/*
See slider.html to see how to include figures with sliders.
*/

function Plotter(divName) {
	this.divName = divName;
	this.params = [];
	this.traceFunc = function() { };
	this.aspect = 1.6;
	this.layout = {
	font: {family: 'Gill Sans', size: 14},
	width: 399,
	// autosize: false,
  margin: {
    l: 60,
    r: 30,
    b: 60,
    t: 30,
    pad: 10
  }
	};
	this.options = {displayModeBar: false};
}

//give the plots some useful methods
Plotter.prototype = {
	constructor:Plotter,

	//evaluate the function to create values and plot
	initializePlot: function() {
		this.trace = this.traceFunc();
		Plotly.newPlot(this.divName, this.trace, this.layout, this.options);
		this.resizePlot();
	},

	//recalculate the function values and replot without recreating entirely
	refreshPlot: function() {
		this.trace = this.traceFunc();
		Plotly.react(this.divName, this.trace, this.layout, this.options);
	},

	// // use plot.ly resize function
	// resizePlot: function() {
	// 	Plotly.Plots.resize(this.divName);
	// },

	// use my own function
	resizePlot: function() {
		this.width = parseInt($("#"+this.divName).parent().css("width"));
		var frameHeight =(this.layout.margin.t+this.layout.margin.b);
		var frameWidth = (this.width-this.layout.margin.l-this.layout.margin.r);
		// var figWidth = frameWidth-2*this.layout.margin.pad;
		// try {
		// 	var barWidth = this.trace[0].colorbar.thickness + 2*this.trace[0].colorbar.xpad;
		// }
		// catch(err) {
		// 	var barWidth = 0;
		// }
		this.height = frameWidth/this.aspect+frameHeight;
		Plotly.relayout(this.divName,{width: this.width, height: this.height});
	}
}

//adds a slider to the element that controls a given parameter index
function addSlider(elements, sliderName, paramIndex, sliderRange) {
	 var slider = $("#" + sliderName).slider({
				orientation: "horizontal",
				//the first element owns the slider and gives it the parameters
				value: elements[0].params[paramIndex],
				min: sliderRange[0],
				max: sliderRange[1],
				step: sliderRange[2],
				slide: function( event, ui ) {
					//when the slider moves, the element parameters are updated and the panel is refreshed
					for (var i = 0; i < elements.length; i++) {
					elements[0].params[paramIndex] = ui.value;
					elements[i].refreshPlot();
					// console.log(elements[i]);
					// console.log(elements);
					}
				}
		});
}
