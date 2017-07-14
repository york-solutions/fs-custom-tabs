const rollup = require('rollup');
const opn = require('opn');

rollup.rollup({
  entry: './src/js/index.js'
}).then(function(bundle){
  return bundle.write({
    format: 'iife',
    dest: 'dist/index.js',
    sourcemap: true
  });
}).then(function(){
  opn('http://reload.extensions');
});