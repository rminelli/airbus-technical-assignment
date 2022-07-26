import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'Airbus Aerospace Systems - Sun Spot Analyser Test';
  }
}
