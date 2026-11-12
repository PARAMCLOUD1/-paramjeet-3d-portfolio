import '@testing-library/jest-dom/vitest'
globalThis.IS_REACT_ACT_ENVIRONMENT = true
// Use jsdom's browser storage instead of Node's experimental global storage.
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: globalThis.jsdom.window.localStorage })
// jsdom has no native dialog top layer. Production uses the browser implementation.
HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', '') }
HTMLDialogElement.prototype.close = function () { this.removeAttribute('open') }
