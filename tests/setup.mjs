import { JSDOM } from "jsdom";

const dom = new JSDOM(
  "<!doctype html><html><head></head><body></body></html>",
  {
    url: "http://localhost/",
    pretendToBeVisual: true,
  },
);

for (const name of [
  "window",
  "document",
  "navigator",
  "Element",
  "HTMLElement",
  "HTMLAnchorElement",
  "MouseEvent",
  "Event",
  "HashChangeEvent",
  "getComputedStyle",
]) {
  Object.defineProperty(globalThis, name, {
    configurable: true,
    value:
      name === "getComputedStyle"
        ? dom.window.getComputedStyle.bind(dom.window)
        : dom.window[name],
  });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.matchMedia = dom.window.matchMedia = () => ({
  matches: true,
  addEventListener() {},
  removeEventListener() {},
});
dom.window.HTMLElement.prototype.scrollIntoView = function () {};
dom.window.HTMLElement.prototype.scrollTo = function ({ left = 0 }) {
  this.scrollLeft = left;
  this.dispatchEvent(new dom.window.Event("scroll"));
};
Object.defineProperty(dom.window.HTMLElement.prototype, "offsetLeft", {
  get() {
    return this.classList.contains("paper-spine")
      ? [...this.parentElement.children].indexOf(this) * 88
      : 0;
  },
});

// jsdom has no Tailwind build or layout engine. Reproduce only visibility
// needed for accessible queries; responsive geometry is checked in a browser.
const styles = dom.window.document.createElement("style");
styles.textContent =
  '.hidden{display:none}.paper-library{display:block}.invisible{visibility:hidden}.more-projects[data-expanded="false"],.paper-disclosure[data-expanded="false"]{visibility:hidden}';
dom.window.document.head.append(styles);
