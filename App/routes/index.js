/*
 * Route functions.
 */
 module.exports = {
  
  index: function(req, res) {
    res.render('index', { title: 'Index' });
  },

  stats: function(req, res) {
    res.render('index', { title: 'Stats' });
  },

  allActivities: function(req, res) {
    res.render('index', { title:'All Activities'});
  },

  activity: function(req, res) {
    var id = req.params.id;
    res.render('index', { title: id });
  }

 }