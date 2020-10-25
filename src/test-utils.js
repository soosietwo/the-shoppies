// test-utils.js
import React from "react";
import { render } from "@testing-library/react";
import { AppProvider, Frame } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import Store from "./store";

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

const AllTheProviders = ({ children }) => {
  return (
    <AppProvider i18n={en}>
      <Store>
        <Frame>{children}</Frame>
      </Store>
    </AppProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
