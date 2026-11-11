import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getRules() {
    return {
      rules: (await this.appService.getRules()).toSorted((a, b) => a.priority - b.priority)
    };
  }
}
