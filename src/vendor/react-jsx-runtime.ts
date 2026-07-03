import React from "./react.js";

type Props = Record<string, unknown> | null | undefined;

function withKey(props: Props, key: string | number | null | undefined) {
  if (key === undefined) {
    return props ?? {};
  }

  return { ...(props ?? {}), key };
}

export const Fragment = React.Fragment;

export function jsx(
  type: Parameters<typeof React.createElement>[0],
  props: Props,
  key?: string | number
) {
  return React.createElement(type, withKey(props, key));
}

export const jsxs = jsx;
