import { observable } from 'mobx';

export default class Transformation {
  public readonly id: string;

  @observable
  public from: string;

  @observable
  public to: string;

  constructor(from: string, to: string) {
    this.id = Date.now().toString();
    this.from = from;
    this.to = to;
  }
}
