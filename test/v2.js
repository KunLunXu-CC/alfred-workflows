import { $ } from 'zx'
import alfy from 'alfy'

$.log = () => {}

const { stdout } = await $`cd /Users/linheng/Works/insight_v2 && git rev-parse --abbrev-ref HEAD`

const currentBranch = stdout.replace(/\s/g, '')

const { stdout: res } = await $`cd /Users/linheng/Works/insight_v2 && git log ${currentBranch}  ^master`

const list = []
res.replace(/: (.*?)(https:.*?)\s/g, (match, title, href) => {
  if (!list.find(v => v.href === href)) {
    list.push({ 
      href,
      title: title.replace(/^.*?【/, '').replace(/】\s*$/, ''),  
    })
  }
  return ''
})

alfy.output(list.map(v => ({
  arg: v.href,
  title: v.title,
})))
