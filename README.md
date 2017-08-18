# JayBox
A Gulp task box ready for project development with Sass, Javascript ES6 transpiling, image minification and more.

## Set up
To begin, install Node and NPM.
Then globally install Gulp with `npm install --global gulp-cli`.
Finally, install all the dependencies with `npm i`.

## Gulp tasks
- Sass compiling with PostCSS, LostGrid, Autoprefixers and minification 
- Image minification
- SVG Symbol generation
- Nunjucks static templates compiling and minification
- Javascript ES6 transpiling and minification
- BrowserSync server for code injection
- Twig compiling and browser refreshing

## Development / Static projects
To get started, run `npm start`. This will build all the assets (Sass etc) into the `/build` directory then it will start watching everything inside the `/_assets` directory for changes.

When a project is ready to go live, run `npm run build` and all the code will be minified then output into the `/build` directory.

## CraftCMS projects
When a project has begun being CMS'd with CraftCMS `npm run cms` becomes the watch task. This will watch all the `.twig` files in the `/craft/templates` directory instead of watching the `.njk` files in the `/_assets` directory.

This also has it's own build command which is `npm run build-cms`.

## Commands

- Dev: `npm run start`
- Build static: `npm run build`
- CMS: `npm run cms`
- Build CMS: `npm run build-cms`
