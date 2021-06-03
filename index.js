const {go} = require('./generator/go')
const {julia} = require('./generator/julia')
const {groovy} = require('./generator/groovy')
const {kotlin} = require('./generator/kotlin')
const {node} = require('./generator/node')
const {python} = require('./generator/python')
const {ruby} = require('./generator/ruby')
const {rust} = require('./generator/rust')
const {swift} = require('./generator/swift')

const {ast} = require('./asts/ast3')


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

function parseFunction(f, generator) {
    if (generator.functionDecl) {
        const decl = generator.functionDecl(f)
        decl.forEach(l => out(l))
        out(``)
    } else {
        out(generator.comment('Not implemented yet\n'))
    }
}

function parseFunctions({functions}, generator) {
    functions.forEach(f => parseFunction(f, generator))
}

function parseStmt(stmt, generator) {
    if (stmt.type === 'fcall') {
        for (l of generator.fcall(stmt))
            out(l, 1)
    }
}

function parseBody({stmts}, generator) {
    stmts.forEach(stmt => parseStmt(stmt, generator))
    
}

function parseMain(ast, generator) {
    if (ast.main != null) {
        const {start, end} = generator.main
        out(start)
        parseBody(ast.main, generator)
        parseExpr(ast.main, generator)
        out(end)
    }
}

function generate(ast, generator) {
    parseFunctions(ast, generator)
    parseMain(ast, generator)
}

generate(ast, julia)
