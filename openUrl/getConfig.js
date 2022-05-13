import fs from 'fs';

// {
//   "title": "主标题",
//   "subtitle": "内容行",
//   "arg": "跳转链接",
//   "icons": "图标",
//   "mods": "定制键盘按键的方法",
// }

export default ({ parentKey, childKey } = {}) => {
  const { CONFIG_URL, HOME } =   process.env;
  const url = CONFIG_URL.replace(/^~/, HOME);
  const config = JSON.parse(fs.readFileSync(url, 'utf8'));

  // 如果有父级 key, 有子级 key
  if (parentKey && childKey) {
    const item = config.find(
      item => item.key.toLocaleLowerCase() === parentKey.toLocaleLowerCase()
    );
   
  return item.children 
    .filter(item => item.key.toLocaleLowerCase().includes(childKey.toLocaleLowerCase()))
    .map(item => ({
      arg: item.url,
      icons: item.icons,
      subtitle: `打开: ${item.url}`,
      title: `「${item.key}」${item.title}`,
    }));
  }

  return config
    .filter(item => item.key.toLocaleLowerCase().includes(parentKey.toLocaleLowerCase()))
    .map(item => ({
      icons: item.icons,
      arg: item.children[0].url,
      title: `「${item.key}」${item.title}`,
      subtitle: `「父级菜单」${item.children.map(ele => ele.key).join(', ')}`,
    }));
}
