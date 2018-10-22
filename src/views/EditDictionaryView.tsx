import * as React from 'react';
import { View } from '.';
import EditDictionary from '../components/EditDictionary';

export default class EditDictionaryView implements View {
  public get path() {
    return `/dictionary/${this.id}`;
  }

  public static pattern = '/dictionary/:id';

  constructor(public readonly id: string) {}

  public render() {
    return <EditDictionary dictionaryId={this.id} />;
  }
}
