import { Planet } from './Planet';

export class PlanetResponse {
  private _count: number;
  private _next?: string;
  private _previous?: string;
  private _results?: Planet[];

  public constructor(){
    this._next = null;
    this._previous = null;
    this._results = [];
  }

  public get count(): number {
    return this._count;
  }
  public set count(value: number) {
    this._count = value;
  }
  public get next(): string {
    return this._next;
  }
  public set next(value: string) {
    this._next = value;
  }
  public get previous(): string {
    return this._previous;
  }
  public set previous(value: string) {
    this._previous = value;
  }
  public get results(): Planet[] {
    return this._results;
  }
  public set results(value: Planet[]) {
    this._results = value;
  }
}