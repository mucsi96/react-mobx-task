export interface View {
  path: string;
  render: () => JSX.Element;
}

export { default as Overview } from './Overview';
export { default as Dictionary } from './Dictionary';
export { default as NotFound } from './NotFound';
