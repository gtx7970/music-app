import { Injectable } from '@nestjs/common';
import {
  getRandomVal,
  token,
  errorData,
  ERROR_CODE,
  mergeSinger,
  fallbackPicUrl,
} from '../utils';
import axios from 'axios';

@Injectable()
export class SearchService {
  async getHotKeys(): Promise<any> {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
    const res = await axios.get(url, {
      params: {
        g_tk_new_20200303: token,
      },
    });

    const { data } = res;

    if (data.code === ERROR_CODE) {
      return {
        success: true,
        desc: null,
        data: {
          hotKeys: data.data.hotkey
            .map((key) => {
              return {
                key: key.k,
                id: key.n,
              };
            })
            .slice(0, 10),
        },
      };
    } else {
      return errorData;
    }
  }

  async searchSong(query, page, showSinger): Promise<any> {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';

    const data = {
      _: getRandomVal(),
      g_tk_new_20200303: token,
      w: query,
      p: page,
      perpage: 20,
      n: 20,
      zhidaqu: 1,
      catZhida: showSinger === 'true' ? 1 : 0,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      remoteplace: 'txt.mqq.all',
      uin: '0',
      needNewCode: 1,
      platform: 'h5',
      format: 'json',
    };

    const res = await axios.get(url, {
      params: {
        data,
      },
    });

    const { data: resData } = res;

    if (resData.code === ERROR_CODE) {
      const songList = [];
      const songData = resData.data.song;
      const list = songData.list;
      list.forEach((item) => {
        const info = item;
        if (info.pay.payplay !== 0 || !info.interval) {
          // 过滤付费歌曲
          return;
        }

        const song = {
          id: info.songid,
          mid: info.songmid,
          name: info.songname,
          singer: mergeSinger(info.singer),
          url: '',
          duration: info.interval,
          pic: info.albummid
            ? `https://y.gtimg.cn/music/photo_new/T002R800x800M000${info.albummid}.jpg?max_age=2592000`
            : fallbackPicUrl,
          album: info.albumname,
        };
        songList.push(song);
      });
      let singer;
      const zhida = resData.data.zhida;
      if (zhida && zhida.type === 2) {
        singer = {
          id: zhida.singerid,
          mid: zhida.singermid,
          name: zhida.singername,
          pic: `https://y.gtimg.cn/music/photo_new/T001R800x800M000${zhida.singermid}.jpg?max_age=2592000`,
        };
      }
      const { curnum, curpage, totalnum } = songData;
      const hasMore = 20 * (curpage - 1) + curnum < totalnum;
      return {
        success: true,
        desc: null,
        data: {
          songs: songList,
          singer,
          hasMore,
        },
      };
    } else {
      return errorData;
    }
  }
}
