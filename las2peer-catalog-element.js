import { LitElement, html } from "./node_modules/lit-element/lit-element.js";
import "./node_modules/@polymer/paper-card/paper-card.js";
import "./node_modules/@polymer/paper-button/paper-button.js";
import "./node_modules/@polymer/iron-icon/iron-icon.js";
import "./node_modules/@polymer/iron-icons/iron-icons.js";
import "./node_modules/@polymer/iron-icons/hardware-icons.js";
import { githubIcon } from './catalog-icons.js';
export class Las2peerCatalogElement extends LitElement {
  static get properties() {
    return {
      name: {
        type: String
      },
      version: {
        type: String
      },
      description: {
        type: String
      },
      githubURL: {
        type: String
      },
      frontendURL: {
        type: String
      }
    };
  }

  constructor() {
    super();
  } // Render method should return a `TemplateResult` using the provided lit-html `html` tag function


  render() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        :host([hidden]) {
          display: none;
        }
              paper-card{
        width: 250px;
        height: 275px;
        display:inline-block;
        margin: 10px;
      }
      .card-header{
        height: 30px;
        background-color: ${this._calculateBackgroundColor(this.name)};
      }
      .service-title {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: -.012em;
        line-height: 24px;
        height: 70px;
      }
      .service-version {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 24px;
        float:right;
        color:#666;
        margin-right: 10px;
      }
      .service-description {
        height: 90px;
        width: 220px;
        overflow-y: hidden;
      }
      paper-button{
        width: 95px;
      }
      a{
        text-decoration: none;
        color:#000;
      }
      </style>
        <paper-card>
            <div class="card-header" id="${this.name}"></div>
            <div class="card-content">
            <div class="service-title"><div>${this.name}</div><div class="service-version">Ver.: ${this.version}</div></div>
            <div class="service-description">${this.description}</div>
            </div>
            <div class="card-actions">
            <a target="_blank" href="${this.githubURL}">
              <paper-button>${githubIcon}</paper-button>
            </a>
            <a target="_blank" href="${this.frontendURL}">
              <paper-button><iron-icon icon="hardware:laptop-mac"></iron-icon></paper-button>
            </a>
            </div>
        </paper-card>
    `;
  } // thanks to https://stackoverflow.com/a/16533568


  _djb2(str) {
    var hash = 5381;

    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
      /* hash * 33 + c */
    }

    return hash;
  }

  _hashStringToColor(str) {
    var hash = this._djb2(str);

    var r = (hash & 0xFF0000) >> 16;
    var g = (hash & 0x00FF00) >> 8;
    var b = hash & 0x0000FF;
    return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
  }

  _calculateBackgroundColor(projectName) {
    if (typeof projectName == "string") {
      return this._hashStringToColor(projectName);
    } else {
      return this._hashStringToColor("undefined");
    }
  }

}
customElements.define('las2peer-catalog-element', Las2peerCatalogElement);