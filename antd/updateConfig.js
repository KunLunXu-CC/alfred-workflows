import fs from 'fs';
import util from 'util'
import process from 'child_process'

import { JSDOM } from 'jsdom'

const exec = util.promisify(process.exec);

/**
 * 获取组件信息
 * @param {String} pageUrl 需要解析页面的 URL
 * @param {String} componentsUrlPre 组件 URL 前缀
 * @returns {[{ title: '标题', arg: '跳转链接' }]}
 */
const get = async (pageUrl, componentsUrlPre) => {
  // 1. GET 请求拿到官网 HTML
  const { stdout: body } = await exec(`curl ${pageUrl}`)

  // 2. 使用 jsdom 解析 HTML
  const dom = await new JSDOM(body);

  // 3. 获取所有菜单节点, 拿到我们想要的数据
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
    const v5 = await get(
      'https://ant.design/components/overview-cn/', 
      'https://ant.design',
    )

    const v4 = await get(
      'https://4x.ant.design/components/overview-cn/', 
      'https://4x.ant.design',
    )
  
    const v3 = await get(
      'https://3x.ant.design/docs/react/faq-cn', 
      'https://3x.ant.design',
    )

    fs.writeFileSync('./config.json', JSON.stringify({
      v5,
      v4,
      v3,
    }, null, 4))
  } catch {}
}

main()