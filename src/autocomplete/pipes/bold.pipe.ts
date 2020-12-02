import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
  name: 'boldPipe'
})
export class BoldPipe implements PipeTransform {

  constructor(
    private sanitizer: Sanitizer
  ) { }

  transform(value: string, regex: string): any {
    return this.sanitize(this.replace(value, regex));
  }

  replace(str: string, regex: string) {
    return `${str.substring(0, regex.length)}<b>${str.substring(regex.length)}</b>`;
  }

  sanitize(str: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, str);
  }

}
