module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // Mantiene el contexto después de las pruebas
    },
    files: [
      // Configuración para incluir los assets en las pruebas
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
    ],
    proxies: {
      // Configuración de proxies para servir los assets desde /base/src/assets/
      '/assets/': '/base/src/assets/'
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/biblioedu'),
      subdir: '.',
      reporters: [
        { type: 'html' }, // Genera informe HTML
        { type: 'text-summary' }, // Resumen de cobertura
        { type: 'lcov' }, // Informe compatible con SonarQube
      ],
    },
    reporters: ['progress', 'coverage'], // Incluye el reporte de cobertura
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
