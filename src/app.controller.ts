import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { RuleDto } from './NewRule.dto.js';
import { Rule } from './Rule.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getRules() {
    return {
      rules: await this.appService.getRules()
    };
  }

  @Post()
  @Render('index')
  async newRule(@Body() body: RuleDto) {
    const macRegex = /^[\da-f]{2}:[\da-f]{2}:[\da-f]{2}:[\da-f]{2}:[\da-f]{2}:[\da-f]{2}$/i;
    let errors = [];
    if (!body.priority) {
      errors.push("Priority number required!")
    }
    if (!macRegex.test(body.mac)) {
      errors.push("MAC address does not match with MAC format")
    }
    if (errors.length > 0) {
      return {
        errors,
        rules: await this.appService.getRules()
      };
    }
    else {
      await this.appService.newRule(parseInt(body.priority), body.mac, parseInt(body.enabled));
      return {
        success: "New rule added to firewall database",
        rules: await this.appService.getRules()
      }
    }
  }
}
