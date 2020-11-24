// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {

  emailReg: string = '^[a-z]+[a-z0-9._]+@[a-zA-Z0-9]+([.]+[a-z]{2,5})+([.]+[a-z]{2,5})*$'

  phoneReg: string = '[0-9]*$';
  phoneMinLength = 8;
  PhoneMaxLength = 10;


}
