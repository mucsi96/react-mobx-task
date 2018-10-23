import * as React from 'react';
import { View } from '.';
import EditTransformation from '../components/EditTransformation';

export default class CreateTransformationView implements View {
  public get path() {
    return `/dictionary/${this.dictionaryId}/transformation/new`;
  }

  public static pattern = '/dictionary/:dictionaryId/transformation/new';

  constructor(public readonly dictionaryId: string) {}

  public render() {
    return <EditTransformation dictionaryId={this.dictionaryId} />;
  }
}
