const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const ip = require('ip')
const prot = 1314
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    const render = path => app.render(req, res, path, query)
    switch (pathname) {
      case '/':
        render('/')
        break
      case '/about':
        render('/about')
        break
      default:
        handle(req, res, parsedUrl)
    }
  }).listen(prot, err => {
    if (err) throw err
    console.info(`> server start on http://${ip.address()}:${prot}`)
  })
})
