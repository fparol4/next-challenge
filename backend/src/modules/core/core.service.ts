import { Injectable } from '@nestjs/common';

interface Cat {
  name: string,
  color: string
}

@Injectable()
export class CoreService {
  list() {
    return [
      {
        name: 'frederico',
        color: 'azul'
      },
      {
        name: 'abacata',
        color: 'verde'
      }
    ]
  }
}
