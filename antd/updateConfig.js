import fs from 'fs';
import alfy from 'alfy';
import got from 'got'
import { JSDOM } from 'jsdom'

/**
 * 获取组件信息
 * @param {String} pageUrl 需要解析页面的 URL
 * @param {String} componentsUrlPre 组件 URL 前缀
 * @returns {[{ title: '标题', arg: '跳转链接' }]}
 */
const get = async (pageUrl, componentsUrlPre) => {
  // 1. 读取 html
  const { body } = await got(pageUrl, { timeout: 20000 });

  // 2. 解析 html
  const dom = await new JSDOM(body);

  // 3. 处理数据
  return [...dom.window.document.querySelectorAll('.main-menu-inner a')].map(v => {
    const [first, second] = v.querySelectorAll('span');

    return {
      arg: `${componentsUrlPre}${v.getAttribute('href')}`,
      title: first?.textContent? `${first?.textContent} ${second?.textContent}`: v.textContent,
    }
  })
}

const main = async () => {
  try {
    const v4 = await get(
      'https://ant.design/components/overview-cn/', 
      'https://ant.design',
    )
  
    const v3 = await get(
      'https://3x.ant.design/docs/react/faq-cn', 
      'https://3x.ant.design',
    )

    fs.writeFileSync('./config.json', JSON.stringify({
      v4,
      v3,
    }, null, 4))
  } catch {}
}

main()