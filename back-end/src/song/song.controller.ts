import { Controller, Get, Query } from '@nestjs/common';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('/url')
  getSongUrl(@Query('mid') mid) {
    return this.songService.getSongUrl(mid);
  }

  @Get('/album')
  getAlbum(@Query('id') id) {
    return this.songService.getAlbum(id);
  }

  @Get('/lyric')
  getLyric(@Query('mid') mid) {
    return this.songService.getLyric(mid);
  }
}
