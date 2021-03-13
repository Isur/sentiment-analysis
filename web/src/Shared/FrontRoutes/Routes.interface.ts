
export interface RouteConfig {
  path: string,
  component: () => JSX.Element,
  exact?: boolean,
  type: "AUTH" | "PRIVATE" | "PUBLIC",
}
