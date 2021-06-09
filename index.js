const _ = require('lodash')

const {C} = require('./generator/c')
const {elixir} = require('./generator/elixir')
const {go} = require('./generator/go')
const {julia} = require('./generator/julia')
const {groovy} = require('./generator/groovy')
const {kotlin} = require('./generator/kotlin')
const {lua} = require('./generator/lua')
const {node} = require('./generator/node')
const {perl} = require('./generator/perl')
const {python} = require('./generator/python')
const {ruby} = require('./generator/ruby')
const {rust} = require('./generator/rust')
const {swift} = require('./generator/swift')

const {ast} = require('./asts/ast4')


function out(s, indent = 0) {
    if (s != null) {
        console.log(' '.repeat(indent * 2) + s)
    }
}

function parseExpr(main, generator) {
    if (main.decl != null) {
        const decl = generator.decl(main.decl)
        out(decl, 1)
    }

    if (main.cond != null) {
        for (c of generator.cond(main.cond))
            out(c, 1)
    }
}

function* parseFunction(f, generator) {
    if (generator.fdecl) {
        yield* generator.fdecl(f)
        yield ""
    } else {
        yield generator.comment('fdecl not implemented yet!')
    }
}

function parseFunctions(package, generator) {
    const {functions} = package
    
    functions.forEach(f => {
        for (l of parseFunction(f, generator))
            out(l)
    })
}

function header({comment, language}) {
    const now = new Date().toISOString()
    out(comment(`Generated for language ${language} on ${now}`))
    out('')
}

function generate({package}, generator) {
    header(generator)
    parseFunctions(package, generator)
}

generate(ast, node)
