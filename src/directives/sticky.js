// Vue 3 directive: v-sticky
// Adds/removes a fixed positioning class when the element reaches the top of the viewport.
// Features:
// - requestAnimationFrame throttling for scroll handling
// - Passive listeners for mobile scrolling
// - Placeholder element to avoid layout shift when fixed
// - Cleanup on unmount
// - Configurable top offset and zIndex via binding value

function getScrollY() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export default {
  mounted(el, binding) {
    const opts = binding?.value || {};
    const topOffset = Number(opts.top ?? 0);
    const zIndex = Number(opts.zIndex ?? 1000);

    let originalTop = 0; // absolute Y position at which we should stick
    let originalWidth = 0;
    let originalHeight = 0;
    let originalRectLeft = 0;
    let isSticky = false;
    let ticking = false;
    let placeholder = null;

    const recalc = () => {
      // Reset any sticky state to measure natural layout
      if (isSticky) {
        removeSticky();
      }
      const rect = el.getBoundingClientRect();
      originalTop = rect.top + getScrollY();
      originalRectLeft = rect.left; // for non-100% width cases
      originalWidth = el.offsetWidth;
      originalHeight = el.offsetHeight;
    };

    const applySticky = () => {
      if (isSticky) return;
      isSticky = true;

      // Create placeholder to avoid layout jump
      placeholder = document.createElement('div');
      placeholder.style.width = `${originalWidth}px`;
      placeholder.style.height = `${originalHeight}px`;
      placeholder.style.visibility = 'hidden';
      placeholder.setAttribute('aria-hidden', 'true');
      if (el.parentNode) {
        el.parentNode.insertBefore(placeholder, el.nextSibling);
      }

      el.classList.add('is-sticky');
      // Keep width and add smooth transition
      el.style.position = 'fixed';
      el.style.top = `${topOffset}px`;
      // Use full width by default; if element is not full width, left + width preserves its layout
      // For robustness we set left/right to 0, and width to 100%. If the element was narrower than viewport,
      // you can switch to left/originalWidth by passing opts.fixedFullWidth = false (future enhancement).
      el.style.left = '0';
      el.style.right = '0';
      el.style.width = '100%';
      el.style.zIndex = String(zIndex);
      el.style.willChange = 'transform';
      // Transition only visual properties to avoid jank on position change
      const existingTransition = getComputedStyle(el).transition;
      if (!existingTransition || existingTransition === 'all 0s ease 0s') {
        el.style.transition = 'box-shadow 200ms ease, transform 200ms ease';
      }
      // Optional subtle elevate when sticky (shadow is often defined in component CSS)
      // Do not force box-shadow here to respect component styling.
    };

    const removeSticky = () => {
      if (!isSticky) return;
      isSticky = false;
      el.classList.remove('is-sticky');
      el.style.position = '';
      el.style.top = '';
      el.style.left = '';
      el.style.right = '';
      el.style.width = '';
      el.style.zIndex = '';
      el.style.willChange = '';
      // Keep transition removal minimal to not break component-set transitions
      // el.style.transition = '';
      if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.removeChild(placeholder);
      }
      placeholder = null;
    };

    const update = () => {
      ticking = false;
      const scrollY = getScrollY();
      // Stick when element's top hits or goes above viewport top
      if (scrollY >= originalTop - topOffset) {
        applySticky();
      } else {
        removeSticky();
      }
    };

    const requestTick = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      requestTick();
    };

    const onResize = () => {
      // Recalculate positions & sizes on resize/orientation change
      recalc();
      requestTick();
    };

    // Initialize
    recalc();
    requestTick();

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    // touchmove helps on some mobile browsers during momentum scrolling
    window.addEventListener('touchmove', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    // Cleanup reference on element
    el.__stickyCleanup__ = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      removeSticky();
    };
  },
  unmounted(el) {
    if (el.__stickyCleanup__) {
      el.__stickyCleanup__();
      delete el.__stickyCleanup__;
    }
  },
};