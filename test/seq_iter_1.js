const {verify} = require('./util')

const {C} = require('../generator/c')
const {elixir} = require('../generator/elixir')
const {go} = require('../generator/go')
const {julia} = require('../generator/julia')
const {groovy} = require('../generator/groovy')
const {kotlin} = require('../generator/kotlin')
const {lua} = require('../generator/lua')
const {node} = require('../generator/node')
const {perl} = require('../generator/perl')
const {python} = require('../generator/python')
const {ruby} = require('../generator/ruby')
const {rust} = require('../generator/rust')
const {swift} = require('../generator/swift')

const {ast} = require('../asts/seq_iter_1')

describe('Test C', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Elixir', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Go', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Julia', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Groovy', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Kotlin', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Lua', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Node', () => {
    it('should iterate over a sequence', () => {
        const expected = 
           `function main() {
              const l = ["aap","noot","mies"]
              l.map((s) => s.length)
            }
  
            main()`

        verify(node, ast, expected)
    })
})

describe('Test Perl', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Python', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Ruby', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Rust', () => {
    it('*** Not implemented *** should iterate over a sequence', () => {
    })
})

describe('Test Swift', () => {
    it('should iterate over a sequence', () => {
        const expected =
              `func main() {
                 let l = ["aap","noot","mies"]
                 l.map({(s) in s.count})
               }

               main()`

        verify(swift, ast, expected)
    })
})
