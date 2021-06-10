const {isEmpty, join} = require('lodash')

const {parseBody, parseFunctions} = require('./shared/shared')

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `// ${comment}`
}

function* package({functions}) {
    yield 'package main'
    yield ''
    yield* parseFunctions(functions, go)
}

function* cond1(options) {
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body, go)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body, go)
    for (i = 1; i < n; i++) {
        yield `else if (${options[i].predicate}) {`
        yield* parseBody(options[i].body, go)
    }
    yield `} else {`
    yield* parseBody(options[n].body, go)
    yield `}`
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

function* fdecl({name, params, body}) {
    yield `func ${name}() {`
    yield* parseBody(body, go)
    yield '}'
}

function* decl({name, type, value}) {
    yield `var ${name} ${type} = ${value}`
}

const go = {
    language: 'Go',
    extension: 'go',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

module.exports = {
    go
}
