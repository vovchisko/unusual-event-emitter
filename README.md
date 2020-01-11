# Unusual Event-Emitter

Because I can. Because I like to use arrow functions in my event listeners. And don't want to save each sh**ty function as a variable just to be able to remove the listener later. So I save it's ID instead!

### Nothing but ES6 Class. Feel free to `extend` from it.
Except for one little detail: The main feature is `event-id` for each event.

```javascript

const UEE = require('./index')

const ev = new UEE()

const event_id = ev.on('pew', (params) => { console.log('ouch!') })

// somewhere else in the universe
// you want to unsubscribe from this specific event
ev.off(event_id)

```

That's it. Nothing to look at... :3

Oh, wait! Maybe also this... `.emit()` returns number of fired events:

```javascript

ev.on('beep', () => { console.log('beep here!') })
ev.on('beep', () => { console.log('and beep there!') })

const howMuch = ev.emit('beep')

console.log('beeped:', howMuch, 'times') // beeped: 2 times

const whosThere = ev.listeners('beep') 
console.log(whosThere) // also output: 2

```


Nah... nevermind. Forget about it.
```javascript
ev.wipe_emitter()
```


#### NOTE:
- No tests.
- No dependencies.
- No mind-blowing features.
- No babel/ts/or-whatever.

#### Future
- Maybe some performance micro-optimizations will come later.
- I will use it.
