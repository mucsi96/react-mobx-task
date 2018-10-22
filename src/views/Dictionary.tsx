import * as React from 'react';
import { View } from '.';

export default class Dictionary implements View {
  public path = '/dictionary';

  public static pattern = '/dictionary';

  public render() {
    return <span>{'Dictionary'}</span>;
  }

  public createFromParams() {
    return new Dictionary();
  }
}
