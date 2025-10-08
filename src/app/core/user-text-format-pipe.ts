import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userTextFormat'
})
export class UserTextFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
