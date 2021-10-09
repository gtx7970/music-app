import { Injectable } from '@nestjs/common';
import {
  getRandomVal,
  getUid,
  token,
  ERROR_CODE,
  errorData,
  handleSongList,
  commonParams,
} from '../utils';
import axios from 'axios';
import { Base64 } from 'js-base64';

const getSecuritySign = require('../utils/sign/sign');

@Injectable()
export class SongService {
  async getSongUrl(mid): Promise<any> {
    let midGroup = [];
    // 第三方接口只支持最多处理 100 条数据，所以如果超过 100 条数据，我们要把数据按每组 100 条切割，发送多个请求
    if (mid.length > 100) {
      const groupLen = Math.ceil(mid.length / 100);
      for (let i = 0; i < groupLen; i++) {
        midGroup.push(mid.slice(i * 100, 100 * (i + 1)));
      }
    } else {
      midGroup = [mid];
    }
    // 以歌曲的 mid 为 key，存储歌曲 URL
    const urlMap = {};

    // 处理返回的 mid
    function process(mid) {
      const data = {
        req_0: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: {
            guid: getUid(),
            songmid: mid,
            songtype: new Array(mid.length).fill(0),
            uin: '0',
            loginflag: 0,
            platform: '23',
            h5to: 'speed',
          },
        },
        comm: {
          g_tk: token,
          uin: '0',
          format: 'json',
          platform: 'h5',
        },
      };

      const sign = getSecuritySign(JSON.stringify(data));
      const url = `https://u.y.qq.com/cgi-bin/musics.fcg?_=${getRandomVal()}&sign=${sign}`;

      // 发送 post 请求
      return axios.post(url, data).then((response) => {
        const data = response.data;
        if (data.code === ERROR_CODE) {
          console.log(data);
          const midInfo = data.req_0.data.midurlinfo;
          const sip = data.req_0.data.sip;
          const domain = sip[sip.length - 1];
          midInfo.forEach((info) => {
            // 获取歌曲的真实播放 URL
            urlMap[info.songmid] = domain + info.purl;
          });
        }
      });
    }

    // 构造多个 Promise 请求
    const requests = midGroup.map((mid) => {
      return process(mid);
    });

    // 并行发送多个请求
    await Promise.all(requests);
    // 所有请求响应完毕，urlMap 也就构造完毕了
    return {
      success: true,
      desc: 'success',
      data: {
        map: urlMap,
      },
    };
  }

  async getLyric(mid): Promise<any> {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
    const res = await axios.get(url, {
      params: Object.assign({}, commonParams, {
        '-': 'MusicJsonCallback_lrc',
        pcachetime: +new Date(),
        songmid: mid,
        g_tk_new_20200303: token,
      }),
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com/',
      },
    });

    const { data } = res;

    if (data.code === ERROR_CODE) {
      return {
        success: true,
        desc: 'success',
        data: {
          lyric: Base64.decode(data.lyric),
        },
      };
    } else {
      return errorData;
    }
  }

  async getAlbum(id): Promise<any> {
    const data = {
      req_0: {
        module: 'srf_diss_info.DissInfoServer',
        method: 'CgiGetDiss',
        param: {
          disstid: Number(id),
          onlysonglist: 1,
          song_begin: 0,
          song_num: 100,
        },
      },
      comm: {
        g_tk: token,
        uin: '0',
        format: 'json',
        platform: 'h5',
      },
    };
    const sign = getSecuritySign(JSON.stringify(data));
    const url = `https://u.y.qq.com/cgi-bin/musics.fcg?_=${getRandomVal()}&sign=${sign}`;

    const res = await axios.post(url, data);

    const { data: resData } = res;

    if (resData.code === ERROR_CODE) {
      const list = resData.req_0.data.songlist;
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
