class ReadMoreDescription extends HTMLElement {
  connectedCallback() {
    this.viewport = this.querySelector('[data-viewport]');
    this.content = this.querySelector('[data-content]');
    this.moreWrap = this.querySelector('[data-more-wrap]');
    this.moreBtn = this.querySelector('[data-toggle="more"]');
    this.lessBtn = this.querySelector('[data-toggle="less"]');

    if (!this.viewport || !this.content) return;

    this._checkOverflow();

    this._expandBound = this._expand.bind(this);
    this._collapseBound = this._collapse.bind(this);

    this.moreBtn?.addEventListener('click', this._expandBound);
    this.lessBtn?.addEventListener('click', this._collapseBound);
  }

  disconnectedCallback() {
    this.moreBtn?.removeEventListener('click', this._expandBound);
    this.lessBtn?.removeEventListener('click', this._collapseBound);
  }

  _checkOverflow() {
    if (this.content.scrollHeight <= this.content.clientHeight) {
      this.moreWrap?.remove();
      this.lessBtn?.remove();
    }
  }

  _expand() {
    const collapsedHeight = this.viewport.offsetHeight;

    this.content.classList.add('is-expanded');
    this.viewport.classList.add('is-expanded-wrap');
    const expandedHeight = this.content.scrollHeight;

    this.viewport.style.height = `${collapsedHeight}px`;
    requestAnimationFrame(() => {
      this.viewport.style.height = `${expandedHeight}px`;
    });

    this.viewport.addEventListener('transitionend', () => {
      this.viewport.style.height = '';
    }, { once: true });

    this.moreBtn?.setAttribute('aria-expanded', 'true');
    this.lessBtn?.removeAttribute('hidden');
    this.lessBtn?.setAttribute('aria-expanded', 'true');
  }

  _collapse() {
    const expandedHeight = this.viewport.offsetHeight;

    this.content.classList.remove('is-expanded');
    this.viewport.classList.remove('is-expanded-wrap');
    const collapsedHeight = this.content.clientHeight;

    this.viewport.style.height = `${expandedHeight}px`;
    requestAnimationFrame(() => {
      this.viewport.style.height = `${collapsedHeight}px`;
    });

    this.viewport.addEventListener('transitionend', () => {
      this.viewport.style.height = '';
    }, { once: true });

    this.moreBtn?.setAttribute('aria-expanded', 'false');
    this.lessBtn?.setAttribute('hidden', '');
    this.lessBtn?.setAttribute('aria-expanded', 'false');
  }
}

customElements.define('read-more-description', ReadMoreDescription);
