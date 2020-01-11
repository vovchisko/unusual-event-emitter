const UEE = require('./index')

const ev = new UEE()

const event_id = ev.on('pew', (params) => { console.log('ouch!') })

// somewhere else in the universe
// you want to unsubscribe from this specific event
ev.off(event_id)

// and maybe this one...
ev.on('beep', () => { console.log('beep here!') })
ev.on('beep', () => { console.log('and beep there!') })

const howMuch = ev.emit('beep')
console.log('beeped:', howMuch, 'times')
// beeped: 2 times

const whosThere = ev.listeners('beep')
console.log(whosThere) // output: 2

// nah... forget about everything
ev.wipe_emitter()