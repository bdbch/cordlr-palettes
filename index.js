const ColorScheme = require('color-scheme')
const Color = require('color')
const Scheme = new ColorScheme

function palettes(bot, config) {

  return function run(message, args) {
    const color = args[0] ? args[0] : false
    const variation = args[1] ? args[1] : 'default'

    if(color) {
      const options = {
        color: color,
        variation: variation
      }

      getHex(options, message)
    } else {
      message.reply('Please enter a valid color')
    }
  }

  function getHex(options, message) {
    try {
      const returnedScheme = Scheme.from_hex(options.color).variation(options.variation)
      let returnedColors = returnedScheme.colors()
      returnedColors.unshift(options.color)
      const colorString = returnedColors.join('-')
      message.reply('Here is your palette: https://coolors.co/' + colorString, {
        embed: {
          image: {
            url: 'https://coolors.co/export/png/' + colorString
          }
        }
      })
    } catch (e) {
      message.reply(e)
    }
  }
}

palettes.command = 'palettes'
palettes.usage = 'palettes <#ff0000> <default/pastel/soft/light/hard/pale>'

module.exports = palettes;
