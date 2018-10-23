import * as React from 'react';
import { View } from '.';
import EditTransformation from '../components/EditTransformation';

export default class EditTransformationView implements View {
  public get path() {
    return `/dictionary/${this.dictionaryId}/transformation/${
      this.transformationId
    }`;
  }

  public static pattern =
    '/dictionary/:dictionaryId/transformation/:transformationId';

  constructor(
    public readonly dictionaryId: string,
    public readonly transformationId: string
  ) {}

  public render() {
    return (
      <EditTransformation
        dictionaryId={this.dictionaryId}
        transformationId={this.transformationId}
      />
    );
  }
}
