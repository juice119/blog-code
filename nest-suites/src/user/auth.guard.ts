import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { CONFIG_OPTIONS, ConfigOptions } from './config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(CONFIG_OPTIONS) private readonly config: ConfigOptions) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    if (apiKey !== this.config.apiKey) {
      throw new UnauthorizedException('invalid api key');
    }
    return true;
  }
}
