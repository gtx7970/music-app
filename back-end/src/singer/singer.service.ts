import { Injectable } from '@nestjs/common';
const pinyin = require('pinyin');
import {
  getRandomVal,
  map,
  ERROR_CODE,
  commonParams,
  handleSongList,
  errorData,
} from '../utils';
import axios from 'axios';
const getSecuritySign = require('../utils/sign/sign');

@Injectable()
export class SingerService {
  async getSingerList(): Promise<any> {
    const url = 'https://u.y.qq.com/cgi-bin/musics.fcg';
    const HOT_NAME = '热';

    const data = JSON.stringify({
      comm: { ct: 24, cv: 0 },
      singerList: {
        module: 'Music.SingerListServer',
        method: 'get_singer_list',
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 0,
          cur_page: 1,
        },
      },
    });

    const randomKey = getRandomVal('getUCGI');
    const sign = getSecuritySign(data);

    const res = await axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com/',
      },
      params: Object.assign({}, commonParams, {
        sign,
        '-': randomKey,
        data,
      }),
    });

    console.log(res);

    if (res.data && res.data.code === 0) {
      const singerList = res.data.singerList.data.singerlist;

      const singerMap = {
        hot: {
          title: HOT_NAME,
          list: map(singerList.slice(0, 10)),
        },
      };
      singerList.forEach((item) => {
        // 把歌手名转成拼音
        const p = pinyin(item.singer_name);
        if (!p || !p.length) {
          return;
        }
        // 获取歌手名拼音的首字母
        const key = p[0][0].slice(0, 1).toUpperCase();
        if (key) {
          if (!singerMap[key]) {
            singerMap[key] = {
              title: key,
              list: [],
            };
          }
          // 每个字母下面会有多名歌手
          singerMap[key].list.push(map([item])[0]);
        }
      });

      // 热门歌手
      const hot = [];
      // 字母歌手
      const letter = [];

      // 遍历处理 singerMap，让结果有序
      for (const key in singerMap) {
        const item = singerMap[key];
        if (item.title.match(/[a-zA-Z]/)) {
          letter.push(item);
        } else if (item.title === HOT_NAME) {
          hot.push(item);
        }
      }
      // 按字母顺序排序
      letter.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return {
        success: true,
        desc: 'success',
        data: {
          singers: hot.concat(letter),
        },
      };
    } else {
      return errorData;
    }
  }

  async getSingerDetail(mid): Promise<any> {
    const url = 'https://u.y.qq.com/cgi-bin/musics.fcg';

    const data = JSON.stringify({
      comm: { ct: 24, cv: 0 },
      singerSongList: {
        method: 'GetSingerSongList',
        param: { order: 1, singerMid: mid, begin: 0, num: 100 },
        module: 'musichall.song_list_server',
      },
    });

    const randomKey = getRandomVal('getSingerSong');
    const sign = getSecuritySign(data);

    const res = await axios.get(url, {
      params: {
        sign,
        '-': randomKey,
        data,
      },
    });

    const { data: resData } = res;

    if (resData.code === ERROR_CODE) {
      const list = resData.singerSongList.data.songList;
      // 歌单详情、榜单详情接口都有类似处理逻辑，固封装成函数
      const songList = handleSongList(list);

      return {
        success: true,
        desc: 'success',
        data: {
          songs: songList,
        },
      };
    } else {
      return errorData;
    }
  }
}
