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

const {ast} = require('../asts/lambda_2')

describe('Test Node', () => {
    it('should generate a lambda variable', () => {
        const expected = 
           `function main() {
              const f = () => 5
              f()
            }
  
            main()`

        verify(node, ast, expected)
    })
})
