# JayBox
A Gulp task box ready for project development with Sass, Javascript ES6 transpiling, image minification and more.

## Setup
To begin, install Node and NPM.
Globally install Gulp with `npm install --global gulp-cli`.
Finally, install all the base project dependencies with `npm i`.

## Gulp Tasks
- Sass compiling with PostCSS, LostGrid, Autoprefixers and minification 
- Image minification
- SVG Symbol generation
- Nunjucks static templates compiling and minification
- Javascript ES6 transpiling and minification
- BrowserSync server for code injection
- Twig compiling and browser refreshing

## Development / Static Projects
To get started, run `npm start`. This will build all the assets (Sass etc) into the `/build` directory then it will start watching everything inside the `/_assets` directory for changes.

When a project is ready to go live, run `npm run build` and all the code will be minified then output into the `/build` directory.

## CraftCMS Projects
When a project has begun being CMS'd with CraftCMS `npm run cms` becomes the watch task. This will watch all the `.twig` files in the `/craft/templates` directory instead of watching the `.njk` files in the `/_assets` directory.

This also has it's own build command which is `npm run build-cms`.

## Build Commands
- Build a static development project: `npm run build`
- Build a static production project: `npm run build-static`
- Build a cms project: `npm run build-cms`

## Watch Commands
- Watch the static files for changes: `npm run start`
- Watch the static files and Craft's Twig files for changes: `npm run cms`