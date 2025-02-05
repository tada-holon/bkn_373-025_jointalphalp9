const gulpset = require('./../../gulpset');
// @verbose
gulpset.gulp.task('browsersync', cb => gulpset.tasks.browsersync(cb));
gulpset.confs.browsersync = {
  port: 3000,
  server: {
    baseDir: gulpset.paths.dest,
    directory: true,
    middleware: []
  },
  startPath: '/',
  open: 'external',
  ghostMode: false
};
//----------------------------------------------------------------------------------------------------
///
const sync = require('browser-sync');
const gutil = require('gulp-util');
gulpset.tasks.browsersync = (cb, conf) => {
  conf = conf || gulpset.confs.browsersync || {};
  if (!Array.isArray(conf)) conf = [conf];
  conf.forEach(conf => {
    const bs = sync.create();
    bs.init(conf);
    gulpset.syncs.push(bs);
  });
  gulpset.stream = opt => {
    opt = opt || null;
    const queue = gutil.noop();
    return queue.pipe(gulpset.syncs[0].stream(opt));
  };
  gulpset.reload = function () {
    gulpset.syncs.forEach(function (bs) {
      bs.reload();
    });
  };
  cb();
};
