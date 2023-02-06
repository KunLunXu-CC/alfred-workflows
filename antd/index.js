import fs from 'fs';
import alfy from 'alfy';

// 1. 获取版本号和检索词
const [,, versions, searchValue] = process.argv

// 2. 读取配置
const config = JSON.parse(
  fs.readFileSync('./config.json', 'utf-8')
)[versions]

// 2. 根据「检索参数」进行过滤
const filterData = config.filter(
  v => v.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
);

// 3. 处理过滤后数据: 过滤后数据为空, 则返回全部、追加额外字段 subtitle
const items = (filterData.length !== 0 ? filterData : config)
.map(v => ({
  ...v,
  subtitle: `打开组件: ${v.title}, 按住 cmd 打开 API`,
  // mod 可以设置通过控制不同按键, 来修改覆盖默认参数
  mods: {
    cmd: {
      arg: `${v.arg}#api`,
      subtitle: `打开组件: ${v.title}, 并跳转至 API`,
    },
  },
}))

// 5. 输出下拉项
alfy.output(items);
