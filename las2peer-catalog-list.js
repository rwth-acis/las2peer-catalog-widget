import { LitElement, html } from "./node_modules/lit-element/lit-element.js";
import { repeat } from "./node_modules/lit-html/directives/repeat.js";
import { until } from "./node_modules/lit-html/directives/until.js";
import './las2peer-catalog-element.js';
import "./node_modules/@polymer/paper-dialog/paper-dialog.js";
import "./node_modules/@polymer/paper-fab/paper-fab.js";
import "./node_modules/@polymer/paper-input/paper-input.js";
import "./node_modules/@polymer/paper-input/paper-textarea.js";
export class Las2peerCatalogList extends LitElement {
  static get properties() {
    return {
      url: {
        type: String
      },
      canAdd: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.services = [];
    this.canAdd = "block";
  } // Render method should return a `TemplateResult` using the provided lit-html `html` tag function


  render() {
    return html`
        <style>
              #addService{
                position: absolute;
                right: 15px;
                margin-top:-30px;
                display: ${this.canAdd};
              }
              #dialog {
                  margin: 0;
                }
                      paper-dialog{
        width:400px;
      }
                      .paper-dialog-content{
        padding:0px 24px 24px 24px;
      }
      paper-textarea,
      paper-input,
      paper-input-container {
        text-align: left;
      }
      paper-toast{
        font-size: 16px;
        font-weight: 500;
      }
      #error {
        --paper-toast-background-color: #F44336;
        --paper-toast-color: white;
      }
      #suc{
        --paper-toast-background-color: #8BC34A;
        --paper-toast-color: white;
      }
        </style>
        ${until(fetch(this.url + "/catalogservice/services").then(res => res.json()).then(data => {
      this.services = data;
      return html`${repeat(this.services, service => service.name, service => {
        return html`<las2peer-catalog-element name="${service.name}" description="${service.description}" version="${service.version}" githubURL="${service.github}" frontendURL="${service.frontend}"></las2peer-catalog-element>`;
      })}
                  <div id="addService" @click="${this._openAddService}"><paper-fab icon="add"></paper-fab></div>
                  `;
    }), html`
            Loading...
            `)}
        
        <paper-dialog id="addServiceDialog">
            <div class="paper-dialog-content">
      <h2>Add a new service</h2>
      <paper-input id="sname" label="Service Name"></paper-input>
      <paper-input id="sversion" label="Version"></paper-input>
      <paper-input id="sgithub" label="Github URL"></paper-input>
      <paper-input id="sfrontend" label="Frontend URL"></paper-input>
      <paper-textarea id="sdescription" label="Description"></paper-textarea>
    </div>
  <div class="buttons">
    <paper-button dialog-dismiss>Cancel</paper-button>
    <paper-button dialog-confirm autofocus @click="${this._submitService}">Add</paper-button>
</div>
        </paper-dialog>
        <paper-toast id="suc" class="fit-bottom" text="Service added!"></paper-toast>
        <paper-toast id="error" class="fit-bottom" text="An error occured!"></paper-toast>
        `;
  }

  _openAddService() {
    this.shadowRoot.getElementById("addServiceDialog").open();
  }

  _submitService() {
    var serviceName = this.shadowRoot.getElementById("sname").value;
    var serviceVersion = this.shadowRoot.getElementById("sversion").value;
    var serviceGithubURL = this.shadowRoot.getElementById("sgithub").value;
    var serviceFrontendURL = this.shadowRoot.getElementById("sfrontend").value;
    var serviceDescription = this.shadowRoot.getElementById("sdescription").value;
    fetch(this.url + '/catalogservice/services/' + serviceName, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8" //   "Authorization": "Bearer " + token

      },
      redirect: "follow",
      referrer: "no-referrer",
      body: '{ "name": "' + serviceName + '", "version": "' + serviceVersion + '", "github": "' + serviceGithubURL + '", "frontend": "' + serviceFrontendURL + '", "description": "' + serviceDescription + '" }'
    }).then(res => res.text()).then(response => {
      this.requestUpdate();
    });
    this.shadowRoot.getElementById("sname").value = "";
    this.shadowRoot.getElementById("sversion").value = "";
    this.shadowRoot.getElementById("sgithub").value = "";
    this.shadowRoot.getElementById("sfrontend").value = "";
    this.shadowRoot.getElementById("sdescription").value = "";
  }

}
customElements.define('las2peer-catalog-list', Las2peerCatalogList);