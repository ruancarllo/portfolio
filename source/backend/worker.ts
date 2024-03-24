import * as vite from 'vite';

import fs from 'fs-extra';
import path from 'path';

class Directories {
  static websiteSource = path.join(__dirname, '..', 'frontend');
  static websiteTarget = path.join(__dirname, '..', '..', 'dist');

  static websitePublics = {
    staticSource: path.join(this.websiteSource, 'static'),
    staticTarget: path.join(this.websiteTarget, 'static'),
  }

  static serverTemplates = {
    subRoute: path.join(__dirname, 'templates', 'sub-route.html'),
  }
}

class Routing {
  static registeredEntries: {[subRoute: string]: {url: string, title: string, description: string, image: string, color: string}} = {
    'quasar': {
      title: 'Quasar',
      description: 'O seu aplicativo de estudos',
      url: 'https://paradoxo-quasar.web.app',
      image: 'https://paradoxo-quasar.web.app/assets/images/application-banner.png',
      color: 'white'
    },
    'unesp': {
      title: 'UNESP · Cronograma do curso noturno',
      description: 'Horários e datas para Ciências da Computação!',
      url: 'https://ruancarllo.github.io/unesp',
      image: 'https://raw.githubusercontent.com/ruancarllo/portfolio/main/source/backend/assets/unesp-banner.png',
      color: '#020617'
    }
  }

  static pageTemplate = fs.readFileSync(Directories.serverTemplates.subRoute, 'utf-8');
}

async function serve() {
  const app = await vite.createServer({
    root: Directories.websiteSource,
    mode: 'development'
  });

  await app.listen(8080);

  console.log(`App running at http://localhost:${app.config.server.port}`);
}

async function build() {
  await vite.build({
    root: Directories.websiteSource,
    mode: 'production',
    base: '',
    publicDir: false,
    build: {
      outDir: Directories.websiteTarget,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]'
        }
      }
    }
  });
  
  const indexPath = path.join(Directories.websiteTarget, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf-8');

  const indexFilteredLines = indexContent.split('\n').filter((item) => item.trim());
  const indexFilteredContent = indexFilteredLines.join('\n');

  fs.writeFileSync(indexPath, indexFilteredContent);
  fs.copy(Directories.websitePublics.staticSource, Directories.websitePublics.staticTarget, (error) => null);
}

async function route() {
  for (let subRoute in Routing.registeredEntries) {
    const subRouteURL = Routing.registeredEntries[subRoute];

    let subRoutePage = Routing.pageTemplate;
    subRoutePage = subRoutePage.replaceAll('SUB-ROUTE', subRouteURL.url);
    subRoutePage = subRoutePage.replaceAll('TITLE', subRouteURL.title);
    subRoutePage = subRoutePage.replaceAll('IMAGE', subRouteURL.image);
    subRoutePage = subRoutePage.replaceAll('DESCRIPTION', subRouteURL.description);
    subRoutePage = subRoutePage.replaceAll('COLOR', subRouteURL.color);

    const subRoutePath = path.join(Directories.websiteTarget, `${subRoute}.html`);

    fs.writeFileSync(subRoutePath, subRoutePage);
  }
}

if (process.argv.includes('build')) build();
if (process.argv.includes('serve')) serve();
if (process.argv.includes('route')) route();