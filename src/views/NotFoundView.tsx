import * as React from 'react';
import { View } from '.';

export default class NotFoundView implements View {
  public get path() {
    return window.location.pathname;
  }

  public static pattern = '*';

  public render() {
    return <span>{'Not found'}</span>;
  }
}
