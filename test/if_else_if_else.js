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

const {ast} = require('../asts/ast5')

function stringToArray(s) {
    return s.split(/\r\n|\r|\n/)
}

function removeWhiteSpace(x) {
    return filter(x.map(trim), x => !isEmpty(x))   
}

function compare(result, expected) {
    const trimmedResult = removeWhiteSpace(result)
    const expectedResult = removeWhiteSpace(stringToArray(expected))
    expect(trimmedResult).to.eql(expectedResult)
}

function verify(generator, expected) {
    const result = Array.from(generator.package(ast.package))
    compare(result, expected)
}

describe('Test C', () => {
    it('should generate an if/else', () => {
        const expected = 
           `#include <stdio.h>

            int main() {
              int x = 5;
              if (x < 5) {
                 printf("x less than 5!");
              } else if (x < 7) {
                 printf("x less than 7!");
              } else {
                 printf("x something else");
              }
              return 0;
            }`

        verify(C, expected)
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
              else if (x < 7) {
                 println("x less than 7!")
              } else {
                 println("x something else")
              }
            }`

        verify(go, expected)
    })
})

describe('Test Groovy', () => {
    it('should generate an if/else', () => {
        const expected = 
           `def main() {
              def x = 5
              if (x < 5) {
                 println "x less than 5!"
              } else if (x < 7) {
                 println "x less than 7!"
              } else {
                 println "x something else"
              }
            }

            main()`

        verify(groovy, expected)
    })
})

describe('Test Julia', () => {
    it('should generate an if/else', () => {
        const expected = 
           `function main()
              x = 5
              if x < 5
                 println("x less than 5!")
              elseif x < 7
                 println("x less than 7!")
              else
                 println("x something else")
              end
            end

            main()`

        verify(julia, expected)
    })
})

describe('Test Lua', () => {
    it('should generate an if/else', () => {
        const expected = 
           `function main()
              x = 5
              if x < 5 then
                 print("x less than 5!")
              elseif x < 7 then
                 print("x less than 7!")
              else
                print("x something else")
              end
            end

            main()`

        verify(lua, expected)
    })
})

describe('Test Node', () => {
    it('should generate an if/else', () => {
        const expected = 
           `function main() {
              const x = 5
              if (x < 5) {
                 console.log("x less than 5!")
              } else if (x < 7) {
                 console.log("x less than 7!")
              } else {
                 console.log("x something else")
              }
            }
  
            main()`

        verify(node, expected)
    })
})

describe('Test Perl', () => {
    it('should generate an if/else', () => {
        const expected = 
           `sub main() {
              $x = 5;
              if (x < 5) {
                 print("x less than 5!");
              } elsif (x < 7) {
                 print("x less than 7!");
              } else {
                 print("x something else");
              }
            }

            main()`

        verify(perl, expected)
    })
})

describe('Test Python', () => {
    it('should generate an if/else', () => {
        const expected = 
           `def main():
              x = 5
              if x < 5:
                print("x less than 5!")
              elif x < 7:
                print("x less than 7!")
              else:
                print("x something else")

            if __name__ == "__main__":
              main()`

        verify(python, expected)
    })
})

describe('Test Ruby', () => {
    it('should generate an if/else', () => {
        const expected = 
           `def main()
              x = 5
              if x < 5
                puts "x less than 5!"
              elseif x < 7
                puts "x less than 7!"
              else
                puts "x something else"
              end
            end

            main`

        verify(ruby, expected)
    })
})
