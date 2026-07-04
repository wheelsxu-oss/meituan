import React from "./react.js";
function withKey(props, key) {
    if (key === undefined) {
        return props ?? {};
    }
    return { ...(props ?? {}), key };
}
export const Fragment = React.Fragment;
export function jsx(type, props, key) {
    return React.createElement(type, withKey(props, key));
}
export const jsxs = jsx;
