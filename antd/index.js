import fs from 'fs';
import alfy from 'alfy';

// 1. 获取版本号和检索词
const [,, versions, searchValue] = process.argv

// 2. 读取配置
const config = JSON.parse(
  fs.readFileSync('./config.json', 'utf-8')
)[versions]

// 3. 过滤或者选择项
const filterData = config.filter(
  v => v.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
);

// 4. 处理过滤后数据
const items = (filterData.length !== 0 ? filterData : config)
.map(v => ({
  ...v,
  subtitle: `打开组件: ${v.title}, 按住 cmd 打开 API`,
  mods: {
    cmd: {
      arg: `${v.arg}#api`,
      subtitle: `打开组件: ${v.title}, 并跳转至 API`,
    },
  },
}))

// 5. 输出
alfy.output(items);
