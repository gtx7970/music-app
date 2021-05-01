import { Controller, Get } from '@nestjs/common'
import { MusicService } from './music.service'

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('/recommend')
  getRecommend() {
    return this.musicService.getRecommend()
  }

  @Get('/singerList')
  getSingerList() {}

  @Get('/singerDetail')
  getSingerDetail() {}

  @Get('/songUrl')
  getSongUrl() {}

  @Get('/lyric')
  getLyric() {}

}