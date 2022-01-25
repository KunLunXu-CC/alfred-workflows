import fs from 'fs';
import alfy from 'alfy';

// 1. 获取版本号和检索词
const [,, versions, searchValue] = process.argv

// 2. 读取配置
const config = JSON.parse(
  fs.readFileSync('./config.json', 'utf-8')
)[versions]

// 3. 过滤或者选择项
const items = config.filter(
  v => v.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
);

// 4. 输出
alfy.output(items.length === 0 ? config : items);
