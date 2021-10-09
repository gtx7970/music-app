import { Controller, Get, Query } from '@nestjs/common';
import { SingerService } from './singer.service';

@Controller('singer')
export class SingerController {
  constructor(private readonly singerService: SingerService) {}

  @Get('/list')
  getRecommend() {
    return this.singerService.getSingerList();
  }

  @Get('/detail')
  getSingerList(@Query('mid') mid) {
    return this.singerService.getSingerDetail(mid);
  }
}
