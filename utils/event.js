var events = {}

/**
 * 注册
 */
function register(name, self, callback) {
  var arr = [self, callback]
  var callbacks = events[name]
  if (Array.isArray(callbacks)) {
    callbacks.push(arr)
  } else {
    events[name] = [arr]
  }
}

/**
 * 反注册
 */
function unregister(name, self) {
  var callbacks = events[name]
  if (Array.isArray(callbacks)) {
    events[name] = callbacks.filter((arr) => {
      return arr[0] != self
    })
  }
}

/**
 * 发送
 */
function send(name, data) {
  var callbacks = events[name]
  if (Array.isArray(callbacks)) {
    callbacks.map((arr) => {
      var self = arr[0]
      var callback = arr[1]
      callback(self, data)
    })
  }
}

module.exports = {
  register,
  unregister,
  send
}