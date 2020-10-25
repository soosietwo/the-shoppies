// test-utils.js
import React from "react";
import { render } from "@testing-library/react";
import { AppProvider, Frame } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
Object.defineProperty(window, "scroll", { value: jest.fn(), writable: true });

const AllTheProviders = ({ children }) => {
  return (
    <div id="test-bed">
      <AppProvider i18n={en}>
        <Frame>{children}</Frame>
      </AppProvider>
    </div>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
