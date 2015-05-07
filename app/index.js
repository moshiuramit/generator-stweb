'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var StwebGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user [Moshiur]
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Stweb generator.'));

    var prompts = [{
      type: 'input',
      name: 'Stweb',
      message: 'What is the name of Your application?',
      default: '(somename)'
    },{
      type: 'confirm',
      name: 'enabl',
      message: 'Would You like to start this application?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.Stweb = props.Stweb;
      this.enabl = props.enabl;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/sass');
    this.mkdir('app/images');
    this.mkdir('app/js');
    this.mkdir('app/css');
    this.mkdir('app/scripts');
    this.mkdir('app/scripts/vendor');
    this.mkdir('app/jade');
    this.mkdir('app/jade/layout');
    this.mkdir('app/jade/partials');

    this.copy('_standard.jade', 'app/jade/layout/_standard.jade');
    this.copy('_head.jade', 'app/jade/partials/_head.jade');
    this.copy('_footer.jade', 'app/jade/partials/_footer.jade');
    this.copy('_index.jade', 'app/jade/index.jade');
    this.copy('_app.scss','app/sass/app.scss');
    this.copy('_app.js','app/scripts/app.js');
    this.copy('_plugins.js','app/scripts/plugins.js');
    this.copy('vendor/jquery-1.10.2.min.js','app/scripts/vendor/jquery-1.10.2.min.js');
    this.copy('vendor/jquery-ui.min.js','app/scripts/vendor/jquery-ui.min.js');
    this.copy('vendor/jquery.fancybox.pack.js','app/scripts/vendor/jquery.fancybox.pack.js');
    this.copy('vendor/jquery.mousewheel.min.js','app/scripts/vendor/jquery.mousewheel.min.js');

    this.template('_remove-all-comments-monkey-patch.rb', 'remove-all-comments-monkey-patch.rb');
    this.template('_component.json', 'component.json');
    this.template('_config.rb', 'config.rb');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('_gruntfile.js', 'Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('csslintrc', '.csslintrc');
    this.copy('csslintrc', '.csslintrc');
    this.copy('README.md', 'README.md');
  }
});
// This portion of the file is created and modified BY Moshiur Rahman Amit

module.exports = StwebGenerator;
