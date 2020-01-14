const Suite = require('benchmark').Suite

const EventEmitter = require('events')
const EE3 = require('eventemitter3')
const UEE = require('./index')

const suite = new Suite()

const testListener = () => {
}

suite
  .add('nodejs-main', () => {
    const ee = new EventEmitter()
    ee.on('test-1', testListener)
    ee.emit('test-1', 'hello world')
    ee.off('test-1', testListener)
    for (let i = 2; i < 1000; i++) {
      ee.on('test-' + i, testListener)
      ee.emit('test-' + i, 'hello world')
      ee.off('test-' + i, testListener)
    }
    ee.removeAllListeners('test-1')
  })
  .add('uee-main', () => {
    const uee = new UEE()
    const id = uee.on('test-1', testListener)
    uee.emit('test-1', 'hello world')
    uee.off(id)
    for (let i = 2; i < 1000; i++) {
      uee.on('test-' + i, testListener)
      uee.emit('test-' + i, 'hello world')
      uee.off('test-' + i, testListener)
    }
    uee.wipe_emitter()
  })
  .add('ee3-main', () => {
    const ee3 = new EE3()
    const id = ee3.on('test-1', testListener)
    ee3.emit('test-1', 'hello world')
    ee3.off(id)
    for (let i = 2; i < 1000; i++) {
      ee3.on('test-' + i, testListener)
      ee3.emit('test-' + i, 'hello world')
      ee3.off('test-' + i, testListener)
    }
    ee3.removeAllListeners('test-1')
  })
  .on('complete', function () {
    console.log(this.map(it => ({ name: it.name, hz: it.hz })))
  })
  .run({ 'async': true })

/**
 /home/----/.nvm/versions/node/v10.8.0/bin/node /home/---/ee-bench.js
 [ { name: 'nodejs-main', hz: 7095981.587635214 },
 { name: 'uee-main', hz: 1047755.4012574981 } ]
 **/
