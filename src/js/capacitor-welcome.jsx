import { SplashScreen } from '@capacitor/splash-screen';
import echoTest from './service';
import VConsole from 'vconsole';
const vConsole = new VConsole();
window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <div>
      <main>
      <button class="button" id="echoTest">echoTest</button>
      </main>
    </div>
    `;
    }
    datas = [];
    connectedCallback() {
      const self = this;
      self.shadowRoot?.querySelector("#echoTest")?.addEventListener('click', echoTest);
    }
  },
);
