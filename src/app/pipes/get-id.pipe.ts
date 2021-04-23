import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getId'
})
export class GetIdPipe implements PipeTransform {

  transform(url: string): string {
    return url.split('/')[6];
  }

}
