import * as React from 'react';
import { View } from '.';
import DictionaryList from '../components/DictionaryList';

export default class Overview implements View {
  public path = '/';

  public static pattern = '/';

  public render() {
    return <DictionaryList />;
  }

  public createFromParams() {
    return new Overview();
  }
}
