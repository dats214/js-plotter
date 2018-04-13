function sineWave(x, [amp, period]) {
  return amp * Math.sin(x*(2*3.14/period))
};

//Energy in eV, rest in SI
//spectral photon flux per wavelength
//take wavelength in um
function spectralPhotonFlux(wl, [temp]) {
    return 1.191/Math.pow(wl,5)*Math.pow(10,14)/(Math.exp(14387.8/wl/temp)-1);
};

function radialFunc(x, y, [decay, period]) {
  var r = Math.pow(Math.pow(x,2) + Math.pow(y,2), 0.5);
  return Math.cos(r*2*3.14/period) * Math.exp(-r/decay)
};
