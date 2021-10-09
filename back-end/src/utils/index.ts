export function getRandomVal(prefix: string = '') {
  return prefix + (Math.random() + '').replace('0.', '');
}

export function getUid() {
  const t = new Date().getUTCMilliseconds();
  return '' + ((Math.round(2147483647 * Math.random()) * t) % 1e10);
}

// 做一层数据映射，构造单个 singer 数据结构
export function map(singerList) {
  return singerList.map((item) => {
    return {
      id: item.singer_id,
      mid: item.singer_mid,
      name: item.singer_name,
      pic: item.singer_pic
        .replace(/\.webp$/, '.jpg')
        .replace('150x150', '800x800'),
    };
  });
}

export const commonParams = {
  g_tk: 5381,
  loginUin: 0,
  hostUin: 0,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  needNewCode: 0,
  format: 'json',
  platform: 'yqq.json',
};

export const token = 5381;

export const ERROR_CODE = 0;

export const fallbackPicUrl =
  'https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000';

// 处理歌曲列表
export function handleSongList(list) {
  const songList = [];

  list.forEach((item) => {
    const info = item.songInfo || item;
    if (info.pay.pay_play !== 0 || !info.interval) {
      // 过滤付费歌曲和获取不到时长的歌曲
      return;
    }

    // 构造歌曲的数据结构
    const song = {
      id: info.id,
      mid: info.mid,
      name: info.name,
      singer: mergeSinger(info.singer),
      url: '', // 在另一个接口获取
      duration: info.interval,
      pic: info.album.mid
        ? `https://y.gtimg.cn/music/photo_new/T002R800x800M000${info.album.mid}.jpg?max_age=2592000`
        : fallbackPicUrl,
      album: info.album.name,
    };

    songList.push(song);
  });

  return songList;
}

// 合并多个歌手的姓名
export function mergeSinger(singer) {
  const ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach((s) => {
    ret.push(s.name);
  });
  return ret.join('/');
}

export const errorData = {
  success: false,
  desc: null,
  data: null,
};
