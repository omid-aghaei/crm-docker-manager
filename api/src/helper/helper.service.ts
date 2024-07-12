import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  extractTag(imageName: string) {
    const temp = imageName.split(':');
    const ver = temp.pop();
    const name = imageName.replace(':' + ver, '');
    return {
      complete: imageName,
      version: ver,
      name: name,
    };
  }
}
