import { Injectable } from '@nestjs/common';
import { getRandomVal, commonParams, ERROR_CODE, errorData } from '../utils';
import axios from 'axios';
const getSecuritySign = require('../utils/sign/sign');

@Injectable()
export class MusicService {
  async getRecommend(): Promise<any> {
    // 第三方服务接口 url
    const url = 'https://u.y.qq.com/cgi-bin/musics.fcg';

    // 构造请求 data 参数
    const postData = JSON.stringify({
      comm: { ct: 24 },
      recomPlaylist: {
        method: 'get_hot_recommend',
        param: { async: 1, cmd: 2 },
        module: 'playlist.HotRecommendServer',
      },
      focus: {
        module: 'music.musicHall.MusicHallPlatform',
        method: 'GetFocus',
        param: {},
      },
    });

    // 随机数值
    const randomVal = getRandomVal('recom');
    // 计算签名值
    const sign = getSecuritySign(postData);

    const res = await axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com/',
      },
      params: Object.assign({}, commonParams, {
        sign,
        '-': randomVal,
        data: postData,
      }),
    });

    console.log(res.data);

    const { data } = res;

    if (data.code === ERROR_CODE) {
      const focusList = data.focus.data.shelf.v_niche[0].v_card;
      const sliders = [];
      const jumpPrefixMap = {
        10002: 'https://y.qq.com/n/yqq/album/',
        10014: 'https://y.qq.com/n/yqq/playlist/',
        10012: 'https://y.qq.com/n/yqq/mv/v/',
      };
      // 最多获取 10 条数据
      const len = Math.min(focusList.length, 10);
      for (let i = 0; i < len; i++) {
        const item = focusList[i];
        const sliderItem: any = {};
        // 单个轮播图数据包括 id、pic、link 等字段
        sliderItem.id = item.id;
        sliderItem.pic = item.cover;
        if (jumpPrefixMap[item.jumptype]) {
          sliderItem.link =
            jumpPrefixMap[item.jumptype] + (item.subid || item.id) + '.html';
        } else if (item.jumptype === 3001) {
          sliderItem.link = item.id;
        }

        sliders.push(sliderItem);
      }

      // 处理推荐歌单数据
      const albumList = data.recomPlaylist.data.v_hot;
      const albums = [];
      for (let i = 0; i < albumList.length; i++) {
        const item = albumList[i];
        const albumItem: any = {};
        // 推荐歌单数据包括 id、username、title、pic 等字段
        albumItem.id = item.content_id;
        albumItem.username = item.username;
        albumItem.title = item.title;
        albumItem.pic = item.cover;

        albums.push(albumItem);
      }

      return {
        success: true,
        desc: 'success',
        data: {
          sliders,
          albums,
        },
      };
    } else {
      return errorData;
    }
  }
}
