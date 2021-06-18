// node index.js | lua

const {isEmpty, join} = require('lodash')

const lua = {
    language: 'Lua',
    extension: 'lua',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    lambda,
    package
}

const {parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(lua)

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `-- ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* cond1([{predicate, body}]) {
    yield `if ${parsePredicate(predicate)} then`
    yield* parseBody(body)
    yield 'end'
}

function* condn(options) {
    const n = options.length - 1
    yield `if ${parsePredicate(options[0].predicate)} then`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        yield `elseif ${parsePredicate(options[i].predicate)} then`
        yield* parseBody(options[i].body)
        if (i != n - 1)
            yield 'end'
    }
    yield `else`
    yield* parseBody(options[n].body)
    yield 'end'
}

function* cond({options}) {
    switch (options.length) {
    case 1:
        yield* cond1(options)
        break
    default:
        yield* condn(options)
    }
 }

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    if (isEmpty(params)) {
        yield `${fname}()`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}")`
    }
}

function* fdecl({name, params, returns, body}) {
    yield `function ${name} ()`
    yield* parseBody(body)
    yield 'end'
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, expr}) {
    yield `${name} = ${parseExpr(expr)}`
}

function* lambda({params, body}) {
    const parsedBody = Array.from(parseBody(body, -1))
    yield `function() ${parsedBody} end`
}

module.exports = {
    lua
}
