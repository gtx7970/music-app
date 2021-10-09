import { Controller, Get, Query } from '@nestjs/common';
import { TopListService } from './topList.service';

@Controller('toplist')
export class TopListController {
  constructor(private readonly topListService: TopListService) {}

  @Get()
  getTopList() {
    return this.topListService.getTopList();
  }

  @Get('/detail')
  getTopListDetail(@Query('id') id, @Query('period') period) {
    return this.topListService.getTopDetail(id, period);
  }
}
