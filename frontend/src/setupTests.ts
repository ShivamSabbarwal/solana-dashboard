import '@testing-library/jest-dom';
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock getScreenCTM method
(Element.prototype as any).getScreenCTM = () => null;