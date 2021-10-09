import { Module } from '@nestjs/common'
import { SingerController } from './singer.controller'
import { SingerService } from './singer.service'

@Module({
  imports: [],
  controllers: [SingerController],
  providers: [SingerService]
})

export class SingerModule {}