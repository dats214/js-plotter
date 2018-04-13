radialFig = new Plotter("radialFig");
radialFig.layout.xaxis = {title: 'x'};
radialFig.layout.yaxis = {title: 'y'};
// radialFig.layout.autosize = false;
// radialFig.layout.width = 60;
// radialFig.layout.height = 500;
radialFig.params = [1, 1];
radialFig.aspect = 1;
radialFig.xs = range(-1, 1, 0.05);
radialFig.ys = range(-1, 1, 0.05);
radialFig.layout.paper_bgcolor ='rgba(1,0,0,0.2)';
radialFig.layout.plot_bgcolor= 'rgba(0,0,1,0.2)';
radialFig.traceFunc = function() {
return [{
  x: radialFig.xs,
  y: radialFig.ys,
  z: radialFig.xs.map(x => radialFig.ys.map(y => radialFunc(x, y, radialFig.params))),
  zmin: -1,
  zmax: 1,
  type: 'heatmap',
  zsmooth: 'best',
  colorbar: {thickness: 30, x: 1.02, xpad: 0, bgcolor: 'rgba(0,1,0,0.2)'},
  colorscale: [[0,'rgb(255,0,0)'],[0.5,'rgb(255,255,255)'],[1,'rgb(0,0,255)']]
}];
};
radialFig.initializePlot();
