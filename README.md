# Tekniska Högskolans Studentkår

## Alpha 2016
## dev.ths.kth.se

## Development Environment
* *App:* AngularJS 1.3.0
* https://material.angularjs.org/latest/
* *Markup:* HTML5/CSS3/JS

## Instructions

`npm install`

`bower install`

## Build & development

Run `grunt build` for building and `grunt serve` for developement.

## Testing

Running `grunt test` will run the unit tests with karma.

##Notice: Dynamic web content
Enable cross-origin resource sharing
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

##Imagemin fix:
$ npm cache clean && npm install gruntjs/grunt-contrib-imagemin
$ npm install --save imagemin-optipng

$ Delete node_modules
$ Change package.json to use "grunt-contrib-imagemin": "1.0.0" 
$ Do npm install