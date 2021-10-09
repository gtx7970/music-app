import { Injectable } from '@nestjs/common';
import { getRandomVal, ERROR_CODE, errorData, handleSongList } from '../utils';
import axios from 'axios';
const getSecuritySign = require('../utils/sign/sign');

@Injectable()
export class TopListService {
  async getTopList(): Promise<any> {
    const url = 'https://u.y.qq.com/cgi-bin/musics.fcg';

    const data = JSON.stringify({
      comm: { ct: 24 },
      toplist: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetAll',
        param: {},
      },
    });

    const randomKey = getRandomVal('recom');
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
      const topList = [];
      const group = resData.toplist.data.group;
      group.forEach((item) => {
        item.toplist.forEach((listItem) => {
          topList.push({
            id: listItem.topId,
            pic: listItem.frontPicUrl,
            name: listItem.title,
            period: listItem.period,
            songList: listItem.song.map((songItem) => {
              return {
                id: songItem.songId,
                singerName: songItem.singerName,
                songName: songItem.title,
              };
            }),
          });
        });
      });

      return {
        success: true,
        desc: null,
        data: topList,
      };
    } else {
      return errorData;
    }
  }

  async getTopDetail(id, period): Promise<any> {
    const url = 'https://u.y.qq.com/cgi-bin/musics.fcg';
    const data = JSON.stringify({
      detail: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetDetail',
        param: {
          topId: Number(id),
          offset: 0,
          num: 100,
          period,
        },
      },
      comm: {
        ct: 24,
        cv: 0,
      },
    });

    const randomKey = getRandomVal('getUCGI');
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
      const list = resData.detail.data.songInfoList;
      const songList = handleSongList(list);
      return {
        success: true,
        desc: null,
        songs: songList,
      };
    } else {
      return errorData;
    }
  }
}
