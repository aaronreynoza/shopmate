import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auth'
})
export class AuthPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
