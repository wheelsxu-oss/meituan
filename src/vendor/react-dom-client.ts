type ReactDomNamespace = typeof import("react-dom/client");

const ReactDOMGlobal = (
  window as typeof window & { ReactDOM: ReactDomNamespace }
).ReactDOM;

export const { createRoot } = ReactDOMGlobal;

export default ReactDOMGlobal;
