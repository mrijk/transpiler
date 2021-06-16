const {isEmpty, map, filter, trim} = require('lodash')

const {expect} = require('chai')

const {python} = require('../generator/python')

const {ast} = require('../asts/ast2')

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

describe('Test Pyton', () => {
    it('should compile an if/else', () => {
        const expected = 
           `def main():
              x = 5
              if x < 5:
                 print("x less than 5!")
              
              if __name__ == "__main__":
                 main()`

        const result = Array.from(python.package(ast.package))
        
        compare(result, expected)
    })
})
