import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    console.log('💚 /health endpoint hit');
    return {
      status: 'ok',
    };
  }
}
