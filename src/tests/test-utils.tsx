import React from "react";
import { Provider } from "react-redux";

import { makeStore } from "../lib/store";
import type { ReactNode } from "react";

export const store = makeStore();

export function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
