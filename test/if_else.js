const {isEmpty, map, filter, trim} = require('lodash')

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

const {ast} = require('../asts/ast3')
const {verify} = require('./util')

describe('Test C', () => {
    it('should generate an if/else', () => {
        const expected = 
           `#include <stdio.h>

            int main() {
              int x = 5;
              if (x < 5) {
                 printf("x less than 5!");
              } else {
                 printf("x larger or equal to 5!");
              }
              return 0;
            }`

        verify(C, ast, expected)
    })
})

describe('Test Go', () => {
    it('should generate an if/else', () => {
        const expected = 
           `package main

            func main() {
              var x = 5
              if (x < 5) {
                 println("x less than 5!")
              } else {
                 println("x larger or equal to 5!")
              }
            }`

        verify(go, ast, expected)
    })
})

describe('Test Groovy', () => {
    it('should generate an if/else', () => {
        const expected = 
           `def main() {
              def x = 5
              if (x < 5) {
                 println "x less than 5!"
              } else {
                 println "x larger or equal to 5!"
              }
            }

            main()`

        verify(groovy, ast, expected)
    })
})

describe('Test Julia', () => {
    it('should generate an if/else', () => {
        const expected = 
           `function main()
              x = 5
              if x < 5
                 println("x less than 5!")
              else
                 println("x larger or equal to 5!")
              end
            end

            main()`

        verify(julia, ast, expected)
    })
})

describe('Test Kotlin', () => {
    it('should generate an if', () => {
        const expected = 
           `fun main() {
              val x = 5
              if (x < 5) {
                 println("x less than 5!")
              } else {
                 println("x larger or equal to 5!")
              }
            }`

        verify(kotlin, ast, expected)
    })
})

describe('Test Lua', () => {
    it('should generate an if/else', () => {
        const expected = 
           `function main()
              x = 5
              if x < 5 then
                 print("x less than 5!")
              else
                print("x larger or equal to 5!")
              end
            end

            main()`

        verify(lua, ast, expected)
    })
})

describe('Test Node', () => {
    it('should generate an if/else', () => {
        const expected = 
           `function main() {
              const x = 5
              if (x < 5) {
                 console.log("x less than 5!")
              } else {
                 console.log("x larger or equal to 5!")
              }
            }
  
            main()`

        verify(node, ast, expected)
    })
})

describe('Test Perl', () => {
    it('should generate an if/else', () => {
        const expected = 
           `sub main() {
              $x = 5;
              if (x < 5) {
                 print("x less than 5!");
              } else {
                 print("x larger or equal to 5!");
              }
            }

            main()`

        verify(perl, ast, expected)
    })
})

describe('Test Python', () => {
    it('should generate an if/else', () => {
        const expected = 
           `def main():
              x = 5
              if x < 5:
                print("x less than 5!")
              else:
                print("x larger or equal to 5!")

            if __name__ == "__main__":
              main()`

        verify(python, ast, expected)
    })
})

describe('Test Ruby', () => {
    it('should generate an if/else', () => {
        const expected = 
           `def main()
              x = 5
              if x < 5
                puts "x less than 5!"
              else
                puts "x larger or equal to 5!"
              end
            end

            main`

        verify(ruby, ast, expected)
    })
})

describe('Test Swift', () => {
    it('should generate an if/else', () => {
        const expected = 
           `func main() {
              let x = 5
              if x < 5 {
                 print("x less than 5!")
              } else {
                 print("x larger or equal to 5!")
              }
            }`

        verify(swift, ast, expected)
    })
})
