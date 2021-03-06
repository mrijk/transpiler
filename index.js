const _ = require('lodash')

const {C} = require('./generator/c')
const {clojure} = require('./generator/clojure')
const {elixir} = require('./generator/elixir')
const {go} = require('./generator/go')
const {groovy} = require('./generator/groovy')
const {java} = require('./generator/java')
const {julia} = require('./generator/julia')
const {kotlin} = require('./generator/kotlin')
const {lua} = require('./generator/lua')
const {node} = require('./generator/node')
const {perl} = require('./generator/perl')
const {python} = require('./generator/python')
const {ruby} = require('./generator/ruby')
const {rust} = require('./generator/rust')
const {swift} = require('./generator/swift')

const {ast} = require('./asts/factorial')


function out(s, indent = 0) {
    if (s != null) {
        console.log(' '.repeat(indent * 2) + s)
    }
}

function header({comment, language}) {
    const now = new Date().toISOString()
    out(comment(`Generated for language ${language} on ${now}`))
    out('')
}

function parseMain(package, generator) {
    for (l of generator.package(package))
        out(l)
}

function generate({package}, generator) {
    header(generator)
    parseMain(package, generator)
}

generate(ast, lua)
