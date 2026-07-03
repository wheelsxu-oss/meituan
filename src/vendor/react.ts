type ReactNamespace = typeof import("react");

const ReactGlobal = (window as typeof window & { React: ReactNamespace }).React;

export const { Fragment, StrictMode, useMemo, useState } = ReactGlobal;

export default ReactGlobal;
