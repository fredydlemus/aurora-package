import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthz(): string {
    return 'Hello World!';
  }
}
