const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) =>{
    await ctx.render('index.pug',{
        title: 'Koa2 boilerplate'
    })
})

router.get('/error', async (ctx,next) => {
    // throw new Error('I am a trouble maker. 😈')
    ctx.throw('I am a trouble maker. 😈', 500)
})

module.exports = router