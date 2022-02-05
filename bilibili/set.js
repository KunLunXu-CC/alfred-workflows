import alfy from 'alfy';

// 1. 读取参数
const arg = process.argv[2];
const [
  roomid, // 房间 id
  csrf,  // coolie.bili_jct
  sessdata, // coolie.SESSDATA
] = arg.split('/');

if (!roomid || !csrf || !sessdata){
  console.log('更新配置失败, 请输入「csrf: coolie.bili_jct」「sessdata: coolie.SESSDATA」「roomid」, 格式: roomid/csrf/sessdata');
  process.exit(1);
}

// 设置缓存
alfy.cache.set('csrf', csrf);
alfy.cache.set('roomid', roomid);
alfy.cache.set('sessdata', sessdata);

// 获取缓存
// alfy.cache.get('unicorn');
console.log('更新配置成功!')
