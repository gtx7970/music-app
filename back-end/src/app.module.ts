import { Module } from '@nestjs/common';
import { MusicModule } from './music/music.module';
import { SingerModule } from './singer/singer.module';
import { SongModule } from './song/song.module';
import { TopListModule } from './top-list/topList.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [MusicModule, SingerModule, SongModule, TopListModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
