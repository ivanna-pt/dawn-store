class FeaturedProductSlider extends HTMLElement {
  connectedCallback() {
    const configEl = this.querySelector('script[type="application/json"]');
    if (!configEl) return;
    const config = JSON.parse(configEl.textContent);

    const slidesMobile = parseInt(config.slidesMobile) || 1;
    const slidesDesktop = parseInt(config.slidesDesktop) || 4;
    const slidesTablet = Math.ceil(slidesDesktop / 2);

    this.swiper = new Swiper(this.querySelector('.fps__swiper'), {
      slidesPerView: slidesMobile,
      spaceBetween: 16,
      grabCursor: true,
      navigation: config.arrows && {
        nextEl: this.querySelector('.fps__nav-btn--next'),
        prevEl: this.querySelector('.fps__nav-btn--prev'),
        disabledClass: 'fps__nav-btn--disabled',
      },
      pagination: config.dots && {
        el: this.querySelector('.fps__pagination'),
        clickable: true,
        bulletClass: 'fps__dot',
        bulletActiveClass: 'fps__dot--active',
      },
      autoplay: config.autoplay && { delay: 3000, disableOnInteraction: false },
      breakpoints: {
        750: { slidesPerView: slidesTablet, spaceBetween: 24 },
        990: { slidesPerView: slidesDesktop, spaceBetween: 24 },
      },
    });
  }
  disconnectedCallback() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
  }
}

customElements.define('featured-product-slider', FeaturedProductSlider);
