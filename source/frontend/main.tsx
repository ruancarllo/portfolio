import * as Preact from 'preact';

import Highlight from './components/highlight.tsx';
import AbilityCard from './components/ability-card.tsx';
import Slider from './components/slider.tsx';
import ProjectCard from './components/project-card.tsx';

import feather from 'feather-icons';

function alternatePageTitle(velocity: number, values: Array<string>, count = 0) {
  document.title = values[count];
  count < values.length - 1 ? count++ : count = 0;

  setTimeout(() => alternatePageTitle(velocity, values, count), velocity);
}

function App() {
  return (
    <Preact.Fragment>
      <section className="startview">
        <h1>
          <Highlight>{"</"}</Highlight>
          <span>ruancarllo</span>
          <Highlight>{">"}</Highlight>
        </h1>
        <p>
          Olá, Mundo! Sou o Ruan, tenho 18 anos e sou calouro no curso de Ciências da Computação da Universidade Estadual Paulista (UNESP).
        </p>
        <h2>
          <Highlight>{"# "}</Highlight>
          <span>Habilidades</span>
        </h2>
        <div className="abilities">
          <AbilityCard animationTime={500} name="HTML" icon="static/icons/html.png" background="#F16529"/>
          <AbilityCard animationTime={500} name="CSS" icon="static/icons/css.png" background="#5789FF"/>
          <AbilityCard animationTime={500} name="JavaScript" icon="static/icons/js.png" background="#FFdd00"/>
          <AbilityCard animationTime={500} name="Python" icon="static/icons/py.png" background="#E2dEdE"/>
          <AbilityCard animationTime={500} name="TypeScript" icon="static/icons/ts.png" background="#3179C6"/>
          <AbilityCard animationTime={500} name="SCSS" icon="static/icons/scss.png" background="#CD669A"/>
          <AbilityCard animationTime={500} name="Dart" icon="static/icons/dart.png" background="#C6F8FF"/>
          <AbilityCard animationTime={500} name="pwsh" icon="static/icons/pwsh.png" background="#4C89CF"/>
          <AbilityCard animationTime={500} name="C#" icon="static/icons/cs.png" background="#DCCDEF"/>
          <AbilityCard animationTime={500} name="Svelte" icon="static/icons/svelte.png" background="#FF4000"/>
          <AbilityCard animationTime={500} name="React" icon="static/icons/react.png" background="#EAFDFF"/>
          <AbilityCard animationTime={500} name="Preact" icon="static/icons/preact.png" background="#A867F8"/>
          <AbilityCard animationTime={500} name="Flutter" icon="static/icons/flutter.png" background="#57a0de"/>
          <AbilityCard animationTime={500} name=".NET" icon="static/icons/dotnet.png" background="#8f78e3"/>
        </div>
        <div className="render">
          <img id="logo" src="static/images/rwan-3d.svg"/>
        </div>
      </section>
      <section className="specifications">
        <div className="visual">
          <img className="face" src="static/images/ruan-face.jpeg"></img>
        </div>
        <div className="about">
          <div className="info">
            <h1>
              <span>Realizações</span>
              <span className="medals">🥇🥇🥇🥇🥈</span>
            </h1>
            <p>
              Durante a minha vida acadêmica, obtive diversas conquistas, dentre as quais está a minha atuação em competições científicas.
            </p>
            <p>
              Nos anos de 2021 e 2023, fui homenageado com medalhas de ouro na Olimpíada Nacional de Ciências. Após conquistar uma de prata na Olimpíada Brasileira de Astronomia e Astronáutica em 2021, fui prestigiado com outras medalhas de ouro em 2022 e 2023.
            </p>
          </div>
          <div className="demo">
            <h1>
              Projetos
            </h1>
            <Slider animationTime={500} autoDelay={5000}>
            <ProjectCard
                title="Quasar"
                description="Um bot educacional de inteligência artificial capaz de randomizar questões resolvidas de vestibulares."
                mainIcon="static/icons/bun.png"
                backgroundColor="#7048e8"
                fontColor="#ffffff"
              />
              <ProjectCard
                title="Pirilampo"
                description="Um bot educacional de inteligência artificial capaz de randomizar questões resolvidas de vestibulares."
                mainIcon="static/icons/node.png"
                backgroundColor="#37b24d"
                fontColor="#ffffff"
              />
              <ProjectCard
                title="Excalibur"
                description="Um software que fornece uma interface de usuário simples para dimensionar objetos no programa 3D Rhinoceros 5."
                mainIcon="static/icons/cs.png"
                backgroundColor="#1c7ed6"
                fontColor="#ffffff"
              />
              <ProjectCard
                title="MusiScript"
                description="Um programa para desktop e web que sintetiza músicas a partir de uma notação textual personalizada."
                mainIcon="static/icons/ts.png"
                backgroundColor="#1098ad"
                fontColor="#ffffff"
              />
              <ProjectCard
                title="Vestractor"
                description="Um software de linha de comando que extrai resoluções de questões de vestibular, salvando-as em YAML ou JSON."
                mainIcon="static/icons/dart.png"
                backgroundColor="#f08c00"
                fontColor="#ffffff"
              />
              <ProjectCard
                title="OneTraductor"
                description="Um conversor de texto do OneNote para uma notação emoji compacta e armazenável."
                mainIcon="static/icons/html.png"
                backgroundColor="#f03e3e"
                fontColor="#ffffff"
              />
            </Slider>
          </div>
        </div>
      </section>
      <div className="footer">
        <p>
          Made with ♥ by R
        </p>
        <div className="social-networks">
          <a href="https://github.com/ruancarllo?tab=repositories" title="GitHub">
            <i data-feather="github"/>
          </a>
          <a href="https://replit.com/@carllotech" title="Replit">
            <i data-feather="box"/>
          </a>
          <a href="https://www.instagram.com/ruancarllosilva" title="Instagram">
            <i data-feather="instagram"/>
          </a>
          <a href="https://www.youtube.com/@canaldoruan147" title="YouTube">
            <i data-feather="youtube"/>
          </a>
        </div>
      </div>
    </Preact.Fragment>
  );
}

Preact.render(<App/>, document.body);
feather.replace();

alternatePageTitle(250, ['Ruancar//o 💻', 'Ruancar//o ⚡', 'Ruancar//o 💡', 'Ruancar//o ⚛']);

const face = document.querySelector('.face');

face?.addEventListener('mouseover', () => {
  face?.animate([
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(20deg) scale(1.1)'},
    {transform: 'rotate(0deg)'}
  ], {
    duration: 1000,
    easing: 'ease-in-out'
  });
});