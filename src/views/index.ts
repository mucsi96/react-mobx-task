export interface View {
  path: string;
  render: () => JSX.Element;
}

export { default as OverviewView } from './OverviewView';
export { default as CreateDictionaryView } from './CreateDictionaryView';
export { default as DictionaryView } from './DictionaryView';
export { default as EditDictionaryView } from './EditDictionaryView';
export { default as NotFoundView } from './NotFoundView';
