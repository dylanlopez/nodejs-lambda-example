export class Planet {
  private _nombre: string;
  private _periodo_rotacion?: string;
  private _periodo_orbital?: string;
  private _diametro?: string;
  private _clima?: string;
  private _gravedad?: string;
  private _tierra?: string;
  private _superficie_agua?: string;
  private _poblacion?: string;
  private _residentes?: string[];
  private _peliculas?: string[];
  private _creacion?: string;
  private _edicion?: string;
  private _url?: string;

  public constructor() {
    this._nombre = '';
    this._periodo_rotacion = null;
    this._periodo_orbital = null;
    this._diametro = null;
    this._clima = null;
    this._gravedad = null;
    this._tierra = null;
    this._superficie_agua = null;
    this._poblacion = null;
    this._residentes = [];
    this._peliculas = [];
    this._creacion = null;
    this._edicion = null;
    this._url = null;
  }

  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }
  public get periodo_rotacion(): string {
    return this._periodo_rotacion;
  }
  public set periodo_rotacion(value: string) {
    this._periodo_rotacion = value;
  }
  public get periodo_orbital(): string {
    return this._periodo_orbital;
  }
  public set periodo_orbital(value: string) {
    this._periodo_orbital = value;
  }
  public get diametro(): string {
    return this._diametro;
  }
  public set diametro(value: string) {
    this._diametro = value;
  }
  public get clima(): string {
    return this._clima;
  }
  public set clima(value: string) {
    this._clima = value;
  }
  public get gravedad(): string {
    return this._gravedad;
  }
  public set gravedad(value: string) {
    this._gravedad = value;
  }
  public get tierra(): string {
    return this._tierra;
  }
  public set tierra(value: string) {
    this._tierra = value;
  }
  public get superficie_agua(): string {
    return this._superficie_agua;
  }
  public set superficie_agua(value: string) {
    this._superficie_agua = value;
  }
  public get poblacion(): string {
    return this._poblacion;
  }
  public set poblacion(value: string) {
    this._poblacion = value;
  }
  public get residentes(): string[] {
    return this._residentes;
  }
  public set residentes(value: string[]) {
    this._residentes = value;
  }
  public get peliculas(): string[] {
    return this._peliculas;
  }
  public set peliculas(value: string[]) {
    this._peliculas = value;
  }
  public get creacion(): string {
    return this._creacion;
  }
  public set creacion(value: string) {
    this._creacion = value;
  }
  public get edicion(): string {
    return this._edicion;
  }
  public set edicion(value: string) {
    this._edicion = value;
  }
  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }
}