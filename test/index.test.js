const request = require('supertest')
const chai = require('chai')
const app = require('../app')

const expect = chai.expect

describe('开始测试demo的GET请求', ()=>{
    it('测试GET / 请求', (done)=>{
        request(app).get('/profile.json').expect(200).end((err, res)=>{
            expect(res.body).to.be.an('object')
            done()
        })
    })
})