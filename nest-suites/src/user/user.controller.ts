import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':id/purchase')
  purchase(@Param('id') id: string, @Body() body: { basePrice: number; couponRate: number }) {
    return this.userService.purchase(id, body.basePrice, body.couponRate);
  }

  @Post(':id/revoke')
  revoke(@Param('id') id: string) {
    return this.userService.revokeAccess(id);
  }
}
