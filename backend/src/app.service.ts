import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createNewUser(body): string {
    return 'Hello World!';
  }
}
