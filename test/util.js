const {isEmpty, map, filter, trim} = require('lodash')

const {expect} = require('chai')

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

function verify(generator, ast, expected) {
    const result = Array.from(generator.package(ast.package))
    compare(result, expected)
}

module.exports = {
    verify
}
