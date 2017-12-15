import { Injectable } from '@angular/core';

import { LoginVM } from '../models';

@Injectable()
export class LoginService {
  private _value: string;
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    this._value = v;
  }
}
