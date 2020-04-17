'use strict'

const path = require('path')
const gulp = require('gulp')
const debug = require('gulp-debug')
const imagemin = require('gulp-imagemin')
const png = require('imagemin-pngquant')

const root = path.resolve(__dirname, '../')

gulp.task('build:copy-files', async () => {
  gulp
    .src([
      `${root}/README*`,
      `${root}/LICENSE*`
    ])
    .pipe(debug())
    .pipe(gulp.dest(`${root}/dist`))
})

gulp.task('build:logo', async () => {
  const floatPrecision = 0

  gulp
    .src(`${root}/src/logo/**/*.svg`)
    .pipe(debug())
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { cleanupNumericValues: { floatPrecision } },
          { convertPathData: { floatPrecision } },
          { transformsWithOnePath: { floatPrecision } },
          { convertTransform: { floatPrecision } },
          { cleanupListOfValues: { floatPrecision } }
        ]
      })
    ]))
    .pipe(gulp.dest(`${root}/dist/logo`))
})

gulp.task('build:media:github:png', async () => {
  gulp
    .src(`${root}/src/media/github/**/*.png`)
    .pipe(debug())
    .pipe(imagemin([
      png({
        speed: 1,
        strip: true,
        quality: [0.75, 0.95]
      })
    ]))
    .pipe(gulp.dest(`${root}/dist/media/github`))
})

gulp.task('build:media:github:svg', async () => {
  gulp
    .src(`${root}/src/media/github/**/*.svg`)
    .pipe(debug())
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { cleanupNumericValues: { floatPrecision: 0 } },
          { convertPathData: { floatPrecision: 1 } },
          { transformsWithOnePath: { floatPrecision: 0 } },
          { convertTransform: { floatPrecision: 0 } },
          { cleanupListOfValues: { floatPrecision: 0 } }
        ]
      })
    ]))
    .pipe(gulp.dest(`${root}/dist/media/github`))
})

gulp.task('build',
  gulp.parallel(
    'build:copy-files',
    'build:logo',
    'build:media:github:png',
    'build:media:github:svg'
  )
)
