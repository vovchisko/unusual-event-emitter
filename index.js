class EE {
  constructor () {
    this._events = {}
    this._ee_iterator = 0
    this._ev_bar = '~'
  }

  /**
   * Create listener for specific event.
   *
   * @param {string} event
   * @param {function} fn
   * @param {boolean} once
   * @return {string} event id
   */
  on (event, fn, once = false) {
    if (!this._events[event]) this._events[event] = {}
    const n = (this._ee_iterator++).toString(36)
    let id = event + this._ev_bar + n
    this._events[event][n] = {
      id,
      n,
      once,
      event,
      fn,
    }
    return id
  };

  /**
   * Create listener for specific event and delete it after first call.
   *
   * @param {string} event
   * @param {function} fn
   * @return {string} event id
   */
  once (event, fn) {
    return this.on(event, fn, true)
  }

  /**
   * Emit event for all listeners.
   * @param ev
   * @return {number}
   */
  emit (ev, a,b,c) {
    if (!this._events[ev]) return 0

    const events = this._events[ev]
    const len = arguments.length
    const args = new Array(len - 1)
    let calls = 0

    for (let i = 1; i < len; i++) {
      args[i - 1] = arguments[i]
    }

    for (let i in events) {
      calls++
      const e = events[i]
      e.fn(a,b,c)
      if (e.once) {
        this.off(e.id)
      }
    }

    return calls
  }

  /**
   * Brutally removes all listeners. All existing ids will become invalid
   */
  wipe_emitter () {
    this._events = {}
  }

  /**
   * Return amount of existing listeners for specified event.
   *
   * Might be expensive for regular usage.
   * If you want to clear listeners - just call wipe_emitter with no checks.
   *
   * @param ev
   * @return {number}
   */
  listeners (ev) {
    if (!this._events[ev]) return 0
    return Object.keys(this._events[ev]).length
  }

  /**
   * Removes listener with specified id.
   * If id is invalid - do nothing.
   *
   * @param id
   * @return {null}
   */
  off (id) {
    const keys = id.split(this._ev_bar)
    if (this._events[keys[0]] && this._events[keys[0]][keys[1]]) {
      delete this._events[keys[0]][keys[1]]
    }
    return null
  }
}

module.exports = EE
