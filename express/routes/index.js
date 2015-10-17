
/*
 * GET home page.
 */

var Engine = require('velocity').Engine;
var engine = new Engine({
    template: '../views/index.vm'
});
var result = engine.render({name: 'velocity'});

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
