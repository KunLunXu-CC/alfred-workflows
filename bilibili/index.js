import alfy from 'alfy';
import axios from 'axios';
import FormData from 'form-data';

// 1. 读取值
const msg = process.argv[2]; // 输入值
const csrf = alfy.cache.get('csrf'); // 缓存值
const roomid = alfy.cache.get('roomid'); // 缓存值
const sessdata = alfy.cache.get('sessdata'); // 缓存值

// 2. 空值处理
if (
  !msg ||
  !csrf ||
  !roomid ||
  !sessdata
) {
  console.log('参数错误!');
  process.exit(1);
}

// 3. 组合参数
const form = new FormData();
Object.entries({
  msg, // 发送内容
  csrf, // coolie.bili_jct
  roomid, // 房间号
  mode: 1,
  fontsize: 25,
  color: 16777215,
  rnd: 1643441166,
}).forEach(([key, value]) => {
  form.append(key, value);
});

// 4. 发送请求、请求处理
try {
  const { data: { code } } = await axios.post('https://api.live.bilibili.com/msg/send', form, { 
    headers: {
      cookie: `SESSDATA=${sessdata};`, // coolie.SESSDATA
      ...form.getHeaders(),
    },
  });
  console.log(`发送${code === 0 ? '成功' : '失败'}!`);
} catch {
  console.log('发送失败!');
}
