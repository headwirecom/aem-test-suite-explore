const fs = require('fs');
const settings = require('./settings.js').config;

const include = {
  I: './steps_file.js'
}

const pages = fs.readdirSync('./pages');
for(let i = 0; i < pages.length; i++) {
  const file = pages[i];
  if(fs.statSync('./pages/'+file).isFile()) {
    const name = file.split('.');
    if(fs.existsSync('./pages/'+settings.version+'/'+file) && fs.statSync('./pages/'+settings.version+'/'+file)) {
      include[name[0]] = './pages/'+settings.version+'/'+file;
    } else {
      include[name[0]] = './pages/'+file;
    }
  }
}

const url = 'http://localhost:' + (settings.port ? settings.port: 4502 + '/aem/start.html');

console.log('testing aem instance at', url);

exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: url,
      windowSize: "1280x960",
      show: false,
      restart: true,
      chrome: {
        args: ['--no-sandbox', '--window-size=1280,960'],
        defaultViewport: {
          width: 1280,
          height: 960
        }
      }
    }
  },
  plugins: {
    "stepByStepReport": {
      "enabled": true,
      "deleteSuccessful": false,
      animateSlides: false
    },
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'login',
      users: {
        admin: {
          login: (I) => {
            console.log('login')
            I.amOnPage('/libs/granite/core/content/login.html');
            I.fillField('j_username', 'admin');
            I.fillField('j_password', 'admin');
            I.click('Sign In');
          },
          check: async (I) => {
            console.log('check')
            I.amOnPage('/aem/start.html');
            I.see('Navigation');
          }
        }
      }
    }
  },
  include: include,
  bootstrap: null,
  mocha: {},
  name: 'aem-test-suite'
}