require.ensure(['./const'], function(require) {
  var content = require('./const');
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});
