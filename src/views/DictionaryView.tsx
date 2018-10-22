import * as React from 'react';
import { View } from '.';
import DictionaryOverview from '../components/DictionaryOverview';

export default class DictionaryView implements View {
  public get path() {
    return `/dictionary/${this.id}`;
  }

  public static pattern = '/dictionary/:id';

  constructor(public readonly id: string) {}

  public render() {
    return <DictionaryOverview dictionaryId={this.id} />;
  }
}
