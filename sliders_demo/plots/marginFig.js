marginFig = new Plotter("marginFig");
marginFig.xs = range(0, 1, 0.02);
marginFig.traceFunc = function() {
return [{
  x: marginFig.xs,
  y: marginFig.xs.map(x => radialFunc(x, 0, radialFig.params)),
  type: 'scatter'
}];
};
marginFig.layout.aspect = 1.5;
marginFig.layout.margin = {l:25, r:5, t: 5, b:20, pad:2};
marginFig.initializePlot();
