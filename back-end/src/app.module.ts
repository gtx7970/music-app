import { Module } from '@nestjs/common';
import { MusiMosule } from './music/music.module'

@Module({
  imports: [MusiMosule],
  controllers: [],
  providers: [],
})

export class AppModule {}
