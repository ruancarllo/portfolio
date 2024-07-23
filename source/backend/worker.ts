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
    nestedRoute: path.join(__dirname, 'templates', 'nested-route.html'),
  }
}

class Routing {
  static registeredEntries: {[subRoute: string]: {url: string, title: string, description: string, image: string, color: string, nested?: string[]}} = {
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
    },
    'infodocs': {
      title: 'InfoDocs',
      description: 'Conglomerado de documentações para a InfoJr',
      url: 'https://ruancarllo.github.io/infojr/docs',
      image: 'https://raw.githubusercontent.com/ruancarllo/portfolio/main/source/backend/assets/infodocs-banner.png',
      color: '#161244',
      nested: [
        'wordpress-agil',
        'wordpress-guia'
      ]
    }
  }

  static subRouteTemplate = fs.readFileSync(Directories.serverTemplates.subRoute, 'utf-8');
  static nestedRouteTemplate = fs.readFileSync(Directories.serverTemplates.nestedRoute, 'utf-8');
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
    const subRouteObject = Routing.registeredEntries[subRoute];

    if (subRouteObject.nested === undefined) {
      let subRoutePage = Routing.subRouteTemplate;
      subRoutePage = subRoutePage.replaceAll('SUB-ROUTE', subRouteObject.url);
      subRoutePage = subRoutePage.replaceAll('TITLE', subRouteObject.title);
      subRoutePage = subRoutePage.replaceAll('IMAGE', subRouteObject.image);
      subRoutePage = subRoutePage.replaceAll('DESCRIPTION', subRouteObject.description);
      subRoutePage = subRoutePage.replaceAll('COLOR', subRouteObject.color);

      const subRoutePath = path.join(Directories.websiteTarget, `${subRoute}.html`);

      fs.writeFileSync(subRoutePath, subRoutePage);
    }

    else {
      let subRoutePage = Routing.subRouteTemplate;
      subRoutePage = subRoutePage.replaceAll('SUB-ROUTE', subRouteObject.url.replaceAll('/docs', ''));
      subRoutePage = subRoutePage.replaceAll('TITLE', subRouteObject.title);
      subRoutePage = subRoutePage.replaceAll('IMAGE', subRouteObject.image);
      subRoutePage = subRoutePage.replaceAll('DESCRIPTION', subRouteObject.description);
      subRoutePage = subRoutePage.replaceAll('COLOR', subRouteObject.color);

      const subRoutePath = path.join(Directories.websiteTarget, `${subRoute}.html`);

      fs.writeFileSync(subRoutePath, subRoutePage);

      const subRouteFolder = path.join(Directories.websiteTarget, subRoute);

      fs.mkdirSync(subRouteFolder, {recursive: true});

      for (let nestedRoute of subRouteObject.nested) {
        let nestedRoutePage = Routing.nestedRouteTemplate;
        nestedRoutePage = nestedRoutePage.replaceAll('NESTED-ROUTE', `${subRouteObject.url}/${nestedRoute}`);
        nestedRoutePage = nestedRoutePage.replaceAll('TITLE', subRouteObject.title);
        nestedRoutePage = nestedRoutePage.replaceAll('IMAGE', subRouteObject.image);
        nestedRoutePage = nestedRoutePage.replaceAll('DESCRIPTION', subRouteObject.description);
        nestedRoutePage = nestedRoutePage.replaceAll('COLOR', subRouteObject.color);

        const nestedRoutePath = path.join(Directories.websiteTarget, subRoute, `${nestedRoute}.html`);

        fs.writeFileSync(nestedRoutePath, nestedRoutePage);
      }
    }
  }
}

if (process.argv.includes('build')) build();
if (process.argv.includes('serve')) serve();
if (process.argv.includes('route')) route();