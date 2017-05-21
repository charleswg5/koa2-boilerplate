const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const http = require('http')

let routers = require('./routes/index')

let app = new Koa()

app.on('error', (error, ctx)=>{
    console.log('Something terrible happened. 😭')
})

app.use(async (ctx, next)=>{
    try {
        await next()
    } catch (err){
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err.ctx)
    }
})

app.use(bodyParser())
app.use(views(path.join(__dirname, 'views'), {
    map: { pug: 'pug' }
}))

app.use(logger())
app.use(serve(path.join(__dirname, 'static')))

app.use(routers.routes()).use(routers.allowedMethods())

let port = process.env.PORT || 3000
let server = http.createServer(app.callback()).listen(port)
server.on('listening', ()=>{
    console.log(`Listening on ${port}`)
})

module.exports = server