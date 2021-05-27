// /* #region  Chargement des modules */
const { series, src, dest, watch } = require('gulp');
// const del = require('delete');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
// const ts = require('gulp-typescript');
// const { spawn, exec } = require('child_process');
// const gulp = require('gulp');
// const help = require('gulp-help-four');
// const filter = require('gulp-filter');
// const browserSync = require('browser-sync').create();
// const reload = browserSync.reload;
// const nodemon = require("gulp-nodemon");
// const server = require('gulp-develop-server');
// /* #endregion */

// /* #region  Configurations */
// const TS_CONFIG = {
//     target: 'es6',
//     noImplicitAny: true,
//     // esModuleInterop: true,
//     module: 'commonjs',
//     moduleResolution: 'node',
//     removeComments: true
// }

// const TS_CONFIG_CLIENT = {
//     target: 'es6',
//     noImplicitAny: true,
//     module: 'commonjs',
//     moduleResolution: 'node',
//     removeComments: true,
// }


// const FILE_TO_RUN = 'server.js';

// //Allow to call gulp help and attach a description to the tasks.
// help(gulp, {});
// /* #endregion */


// /* #region  Définition des tâches */
// /**
//  * Vider les dossiers build et buildx
//  */
// function clean(next) {
//     console.log("... traitement du clean ...");
//     del(['build/*', 'buildx/*'], next);
// }

// function compile_client() {
//     return src('src/www/**/*.ts')
//         .pipe(ts(TS_CONFIG_CLIENT))
//         .pipe(dest('build/www/'))
//     // .pipe(browserSync.stream());
// }

// /**
//  * Lancement du build
//  * - Transpilation
//  */
// function compile_server() {
//     return src(['src/**/*.ts', '!src/www/**/*'])
//         .pipe(ts(TS_CONFIG))
//         .pipe(dest('build/'))
//     // .pipe(browserSync.stream());
// }

// const compile = series(compile_client, compile_server);

// /**
//  * Copie les ressources non ts situées dans src/www
//  */
// function copy_www() {
//     return src(['src/www/**/*', '!src/**/*.ts'])
//         .pipe(dest('build/www'));
// }

// const build = series(compile, copy_www);

// gulp.task('serve', ['sass'], function () {

//     // browserSync.init({
//     //     server: "./src/",
//     //     port: 8080
//     // });
//     gulp.watch(['src/**/*.ts', '!src/www/**/*'], series(build, run));
//     gulp.watch('src/www/**/*.ts', series(compile_client, reload));
//     // gulp.watch("./src/*.ts").on('change', browserSync.reload);
// });

// gulp.task('nodemon', function () {
//     return nodemon({
//         // script: 'build/server.js',
//         watch: ["src"],
//         ext: '.ts',
//         // tasks: "build",
//         exec: "node ./build/server.js"

//         // "watch": ["src"],
//         // "ext": ".ts,.js",
//         // "ignore": [],
//         // "exec": "tsc ./src/server.ts",
//         // "tasks": build

//         // , env: { 'NODE_ENV': 'development' }
//     });
// })

// gulp.task('default', series(build, server, watch));

// // gulp.task('build2', () => {
// //   return tsProject.src()
// //     .pipe(tsProject())
// //     .js.pipe(gulp.dest('build'));
// // });

// gulp.task('server', ['build'], () => {
//   server.listen({ path: 'build/server.js' });
// });

// gulp.task('watch', () => {
//   gulp.watch('src/**', ['build', server.restart]);
// });

// // gulp.task("wa", function () {
// //     gulp.watch(['src/www/**/*.ts'], compile_client);
// //     gulp.watch(['src/www/**/*', '!src/**/*.ts'], copy_www);
// //     gulp.watch(['src/**/*.ts', '!src/www/**/*'], compile_server);
// // });

// // Occultation du code client uniquement
// function buildx() {
//     const f = filter(['build/www/**/*.js', '!build/www/**/*.min.js'], { restore: true })
//     return src('build/**/*.js')
//         .pipe(f) // get only client files
//         .pipe(uglify()) // The gulp-uglify plugin won't update the filename
//         .pipe(rename({ extname: '.min.js' })) // So use gulp-rename to change the extension
//         .pipe(f.restore) // exit from the filter (/www folder) to get the complete build/ folter
//         .pipe(dest('buildx/'));
// }

// /**
//  * Run the application from build folder 
//  */
// function run(next) {
//     const cmd = spawn("node", [FILE_TO_RUN], { cwd: "build" });
//     cmd.stdout.on("data", val => console.log(val.toString()));
//     cmd.stderr.on("data", val => console.log(val.toString()));
//     cmd.on("close", next);
// }

// const full = series(clean, build, buildx, run);

// /* #endregion */

// /* #region  Publication des tâches */
// gulp.task('clean', 'Clean build and buildx folder', ['cl'], clean);
// gulp.task('build', 'Transpilation of ts code', ['b'], build);
// gulp.task('compile', 'Compilation of .ts code', ['c'], compile);
// gulp.task('compile_server', 'Compilation of .ts server code', ['cs'], compile_server);
// gulp.task('compile_client', 'Compilation of .ts client code', ['cc'], compile_client);
// gulp.task('uglify', 'Minify and rename the files', ['bx'], buildx);
// gulp.task('run', `run ${FILE_TO_RUN} file from build folder`, ['r'], run);
// gulp.task('full', 'clean, build, uglify and run code', ['f'], full);
// // exports.default = build;
// /* #endregion */


const gulp = require('gulp');
const server = require('gulp-develop-server');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function build1() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('build'));
};

function copy_www() {
    return src(['src/www/**/*', '!src/**/*.ts'])
        .pipe(dest('build/www'));
}

const build = series(build1, copy_www);


function serverTask(){
  server.listen({ path: 'build/server.js' });
};

gulp.task('watch', () => {
  gulp.watch('src/**', [build, server.restart]);
});

gulp.task('build', build);
gulp.task('server', serverTask);
gulp.task('default', series(build, serverTask, watch));