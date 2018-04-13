spfFig = new Plotter("spfFig");
spfFig.layout.xaxis = {title: 'wavelength (um)'};
spfFig.layout.yaxis = {title: 'SPF'};
spfFig.params = [300];
spfFig.xs = range(0, 60, 0.01);
spfFig.traceFunc = function() {
return [{
  x: spfFig.xs,
  y: spfFig.xs.map(x => spectralPhotonFlux(x, spfFig.params)),
  type: 'scatter'
}];
};
spfFig.initializePlot();
