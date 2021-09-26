import path from 'path'

console.log(JSON.stringify({
  items: [
    {
      title: 'title1',
      subtitle: 'subtitle',
      arg: 'https://gitlab.dxy.net/f2e/insight-manager/-/merge_requests/402',
      icon: {
        path: new URL('./E8F85589-F67A-4DC4-A472-E781462F41BF.png', import.meta.url).pathname
      }
    },
    {
      title: 'title2',
      subtitle: 'subtitle',
      arg: 'https://gitlab.dxy.net/f2e/insight-manager/-/merge_requests/402',
      icon: {
        path: new URL('./E8F85589-F67A-4DC4-A472-E781462F41BF.png', import.meta.url).pathname
      }
    },
    {
      title: 'title3',
      subtitle: 'subtitle',
      arg: 'https://gitlab.dxy.net/f2e/insight-manager/-/merge_requests/402',
      icon: {
        path: './E8F85589-F67A-4DC4-A472-E781462F41BF.png',
      }
    }
  ]
}))
