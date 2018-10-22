import * as React from 'react';
import { View } from '.';
import EditDictionary from '../components/EditDictionary';

export default class CreateDictionaryView implements View {
  public path = '/dictionary/new';

  public static pattern = '/dictionary/new';

  public render() {
    return <EditDictionary />;
  }
}
