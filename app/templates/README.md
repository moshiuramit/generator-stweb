# generator-stweb

> [Yeoman](http://yeoman.io) generator

![](http://www.sourcetop.com/sites/all/themes/sourcetop/logo.png)
## Generator [Sourcetop](http://sourcetop.com) Web

This generator is a collection of recipes that we use to create frontend html, CSS and JavsScript. This also includes linting tools to make sure our code valids all Web Standards. Includes Packages are :

**Jade** - Used for HTML generation   
**SASS** - Used as CSS Preprocessor   
**Rigger** - Used to combine specific javascript files into a master controller.   
**jshint** - For Javascript linting   
**csslint** - For CSS Linting   
**htmllint** - For W3c Validation   


#### Quick Commands

* ``grunt server`` to start live reload
* ``grunt build`` Build the destribution pack
* ``grunt csslint`` CSS Linting
* ``grunt htmllint`` W3c Validation requires java in your environment
* ``grunt jshint`` Javascript Linting


#### FAQ:

I have started my server then I added a new myfirst.jade inside jade folder. But its not showing up in browser?

>Grunt triggers compilation if changes are made to existing files. As you have created a new file it wont compile. You have to re-run the server. Press **ctrl+c** twice and then execute ```$grunt server```.

I have a quick change need to be done in test.html. Should i edit the specific html file?

>NO. All html files are being converted from jade template file. Any small or big changes has to be made in jade. jade syntax [Visit](http://jade-lang.com)

Big thanks to Yeoman and all the contributors. Check the contents in package.json for all required packages.

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-stweb from npm, run:

```
$ npm install -g generator-stweb
```

Finally, initiate the generator:

```
$ yo stweb
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
