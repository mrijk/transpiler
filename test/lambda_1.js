const {verify} = require('./util')
const {expect} = require('chai')

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

const {ast} = require('../asts/lambda_1')

describe('Test Go', () => {
    it('should generate a lambda variable', () => {
        const expected = 
           `package main

            func main() {
              var f = func() {println("Hello Lambda!")}
              f()
            }`

        verify(go, ast, expected)
    })
})

describe('Test Julia', () => {
    it('should generate a lambda variable', () => {
        const expected = 
           `function main()
              f = () -> println("Hello Lambda!")
              f()
            end
            main()`

        verify(julia, ast, expected)
    })
})

describe('Test Groovy', () => {
    it('should generate a lambda variable', () => {
        const expected = 
           `def main() {
              def f = {println "Hello Lambda!"}
              f
            }
            main()`

        verify(groovy, ast, expected)
    })
})

describe('Test Node', () => {
    it('should generate a lambda variable', () => {
        const expected = 
           `function main() {
              const f = () => {console.log("Hello Lambda!")}
              f()
            }
  
            main()`

        verify(node, ast, expected)
    })
})

describe('Test Python', () => {
    it('should generate a lambda variable', () => {
        const expected = 
           `def main():
              f = lambda : print("Hello Lambda!")
              f()

            if __name__ == "__main__":
              main()`

        verify(python, ast, expected)
    })
})


describe('Test Swift', () => {
    it('should generate a lambda variable', () => {
        const expected = 
           `func main() {
              let f = {() in print("Hello Lambda!")}
              f()
            }`

        verify(swift, ast, expected)
    })
})
