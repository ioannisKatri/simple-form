export class DomainModel<T> {
  constructor(private readonly _data: T) {}

  public get data(): T {
    return this._data
  }
}
