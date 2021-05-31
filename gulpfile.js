/* #region  Chargement des modules */
const { series, src, dest, watch } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const { spawn } = require('child_process');
const gulp = require('gulp');
const help = require('gulp-help-four');
const filter = require('gulp-filter');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var del = require('gulp-clean');
var args = require('get-gulp-args')();
const git = require('gulp-git');
/* #endregion */

/* #region  Configurations */
const GULP_CONFIG = {
    git_repository: "https://github.com/EmmanuelNativel/my-ts-template.git",
    server_port: 8080,
    build_root_file: "server.js",
    gitignore: ['!build', '!buildx', '!node_modules', '!package-lock.json']
}

const TS_CONFIG = {
    target: 'es6',
    noImplicitAny: true,
    module: 'commonjs',
    moduleResolution: 'node',
    removeComments: true
}

help(gulp, {});
/* #endregion */

/* #region  Tâches Build et dev */

function cleanClient(next) {
    return src('build/*')
        .pipe(filter(['www']))
        .pipe(del());
}

function cleanServer(next) {
    return src('build/*')
        .pipe(filter(['*', '!www']))
        .pipe(del());
}

function clean() {
    return src('build/*')
        .pipe(del());
}

function build_client_only() {
    return src('src/www/**/*.ts')
        .pipe(ts(TS_CONFIG))
        .pipe(dest('build/www/'));
}

function build_server_only() {
    return src(['src/**/*.ts', '!src/www/**/*'])
        .pipe(ts(TS_CONFIG))
        .pipe(dest('build/'));
}

function copy_www() {
    return src(['src/www/**/*', '!src/**/*.ts'])
        .pipe(dest('build/www'));
}

// Occultation du code client uniquement
function buildx() {
    const f = filter(['build/www/**/*.js', '!build/www/**/*.min.js'], { restore: true })
    return src('build/**/*.js')
        .pipe(f) // get only client files
        .pipe(uglify()) // The gulp-uglify plugin won't update the filename
        .pipe(rename({ extname: '.min.js' })) // So use gulp-rename to change the extension
        .pipe(f.restore) // exit from the filter (/www folder) to get the complete build/ folter
        .pipe(dest('buildx/'));
}

function initBrowserSync(next) {
    browserSync.init({
        proxy: `localhost:${GULP_CONFIG.server_port}`
    });
    next();
}

function dev_watch(next) {
    var started = false;
    nodemon({
        script: `build/${GULP_CONFIG.build_root_file}`,
        watch: "build/**"
    }).on('start', function () {
        if (!started) {
            next();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload();
        }, 500);
    });

    watch(['src/**', '!src/www/**'], build_server);
    watch('src/www/**', build_client);
}

const build_client = series(cleanClient, build_client_only, copy_www);
const build_server = series(cleanServer, build_server_only);
const build = series(clean, build_client_only, build_server_only, copy_www);
const build_prod = series(clean, build, buildx);
const start_dev = series(clean, build, initBrowserSync, dev_watch);

/* #endregion */

/* #region  Tâches GIT */
function git_init(next) {
    git.init(function (err) {
        if (err) throw err;
        next();
    });
};

function git_addremote(next) {
    const url = args.url || GULP_CONFIG.git_repository;
    git.addRemote('origin', url, function (err) {
        if (err) throw err;
        next()
    });
};

const git_initialization = series(git_init, git_addremote);

function git_add() {
    return gulp.src(['./*', '.gitignore', ...GULP_CONFIG.gitignore])
        .pipe(git.add({ args: '-A', quiet: true }));
};

function git_commit() {
    const message = args.m || "commit changes";
    let type = "";
    if (args.fix) type = "[FIX]";
    else if (args.feat) type = "[FEAT]";

    const commitText = `${type} ${message}`;

    console.log(commitText);

    return gulp.src(['./*', ...GULP_CONFIG.gitignore])
        .pipe(git.commit(commitText));
}

function git_reset_last_commit(next) {
    git.reset('HEAD~1', function (err) {
        if (err) throw err;
        next();
    });
}

function git_status(next) {
    git.status(function (err, stdout) {
        if (err) throw err;
        next();
    });
};

function git_push(next) {
    git.push('origin', function (err) {
        if (err) throw err;
        next();
    });
};

function git_pull(next) {
    git.pull('origin', function (err) {
        if (err) throw err;
        next();
    });
    next();
};

const g_commit = series(git_add, git_commit, git_status);
const g_add = series(git_add, git_status);
const g_push = series(git_push, git_status);
const g_send = series(git_add, git_commit, git_push, git_status);
const g_pull = series(git_pull, git_status);
/* #endregion */

/* #region  Publication des tâches */

/* #region Build et mode développement  */
gulp.task('clean', 'Clean build and buildx folders.', ['cl'], clean);
gulp.task('build_client', 'Build client code only.', ['bc'], build_client);
gulp.task('build_server', 'Build server code only.', ['bs'], build_server);
gulp.task('build', 'Build the full code.', ['b'], build);
gulp.task('build_prod', 'Build the full code and uglify client code for production.', ['prod'], build_prod);
gulp.task('start_dev', 'Start development mode : build and reload when a file change.', ['dev'], start_dev);
/* #endregion */

/* #region  GIT */
gulp.task('git_init', 'git initialization', ['gi'], {
    '--url': '[STRING] URL of the git remote repository',
}, git_initialization);
gulp.task('git_add', 'Stage modified files', ['ga'], g_add);
gulp.task('git_commit', 'Commit a FIX or a FEAT', ['gc'], {
    '--m': '[STRING] Message of the commit',
    '--fix': '[BOOL] Tag the commit as a FIX (bug fix)',
    '--feat': '[BOOL] Tag the commit as a FEAT (new feature)',
}, g_commit);
gulp.task('git_status', 'Commit status', ['gs'], git_status);
gulp.task('git_reset', 'Reset last commit', ['gr'], git_reset_last_commit);
gulp.task('git_push', 'Push to the current branch.', ['gph'], g_push);
gulp.task('git_send', 'Commit and push changes', ['g'], {
    '--m': '[STRING] Message of the commit',
    '--fix': '[BOOL] Tag the commit as a FIX (bug fix)',
    '--feat': '[BOOL] Tag the commit as a FEAT (new feature)',
}, g_send);
gulp.task('git_pull', 'Pull changes from current branch', ['gpl'], g_pull);
/* #endregion */

exports.default = start_dev;
/* #endregion */