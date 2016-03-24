var events = require('events')

exports.debug = function(msg){
    // TODO: Add more functionality
    console.log(msg)
}

module.exports = new events.EventEmitter()