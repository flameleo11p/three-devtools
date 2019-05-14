import BaseElement, { html } from './BaseElement.js';

const $onActivate = Symbol('onActivate');

export default class ImagePreviewElement extends BaseElement {
  static get typeHint() { return 'image'; }

  static get properties() {
    return {
      width: { type: Number, reflect: true },
      height: { type: Number, reflect: true },
      ...BaseElement.properties,
    }
  }

  constructor() {
    super();
    this.width = 0;
    this.height = 0;
  }

  render() {
    const image = this.getEntity();

    if (!image) {
      return html`None`;
    }

    console.log(image);
    return html`
<style>
  :host {
    width: 100%;
    display: block;
  }
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  .dimensions {
    text-align: center;
  }
</style>
<img @click="${this[$onActivate]}" src="${image.url}" />
<div class="dimensions">${this.width + ' x ' + this.height}</div>
`;
  }

  updated(changedProperties) {
    const image = this.shadowRoot.querySelector('img');
    this.width = image.naturalWidth;
    this.height = image.naturalHeight;
  }

  [$onActivate](e) {
    this.app.dispatchEvent(new CustomEvent('select-object', { detail: {
      uuid: this.uuid,
      typeHint: 'image',
    }}));
  }
}
