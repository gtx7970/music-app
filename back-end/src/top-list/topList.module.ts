import { Module } from '@nestjs/common'
import { TopListController } from './topList.controller'
import { TopListService } from './topList.service'

@Module({
  imports: [],
  controllers: [TopListController],
  providers: [TopListService]
})

export class TopListModule {}