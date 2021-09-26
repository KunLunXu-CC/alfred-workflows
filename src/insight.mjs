#!/usr/bin/env node
import fs from 'fs';

const param = process.argv[2]

const map = {
  // 前后
  qa: {
    title: '[前台] QA 环境',
    arg: 'https://dbqa.dxy.net/dev',
  },
  ins: {
    title: '[前台] 线上环境',
    arg: 'https://db.dxy.cn/v5',
  },
  dev: {
    title: '[前台] 测试环境',
    arg: 'https://db.dxy.net/dev',
  },
  ca: {
    title: '[前台] 灰度环境',
    arg: 'https://canary.db.dxy.cn/v5',
  },

  // 后台
  mqa: {
    title: '[后台] QA 环境',
    arg: 'https://dbqa.dxy.net/manage/newversion',
  },
  mins: {
    title: '[后台] 线上环境',
    arg: 'https://db.dxy.cn/manage/newversion',
  },
  mdev: {
    title: '[后台] 测试环境',
    arg: 'https://db.dxy.net/manage/newversion',
  },
  mca: {
    title: '[后台] 灰度环境',
    arg: 'https://canary.db.dxy.cn/manage/newversion',
  },
};

const items = Object.entries(map).reduce((total, [key, value]) => (!param || key?.includes(param) ? [
  ...total, 
  { 
    ...value, 
    subtitle: `通过关键词 ${key} 快速检索`,
    icon: {
      path: 'src/icon/insight.png'
    } 
  }
] : total), []);

console.log(JSON.stringify({ items }));

// 文件需要打印出如下格式的 JSON 数据
// console.log(JSON.stringify({
//   items: [
//     {
//       title: 'title1',
//       subtitle: 'subtitle',
//       arg: 'https://gitlab.dxy.net/f2e/insight-manager/-/merge_requests/402',
//       icon: {
//         path: 'src/icon/insight.png'
//       }
//     }
//   ]
// }))
