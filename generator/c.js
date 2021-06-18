// node index.js | gcc -x c -

const {isEmpty, join} = require('lodash')

const C = {
    language: 'C',
    extension: 'c',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

const {parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(C)

const fmap = new Map([
    ['print', 'printf']
])

function comment(comment) {
    return `/* ${comment} */`
}

function* package({functions}) {
    yield '#include <stdio.h>'
    yield* parseFunctions(functions)
}

function* cond1([{predicate, body}]) {
    yield `if (${parsePredicate(predicate)}) {`
    yield* parseBody(body)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
    yield `if (${parsePredicate(options[0].predicate)}) {`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        yield `} else if (${parsePredicate(options[i].predicate)}) {`
        yield* parseBody(options[i].body)
        yield '}'
    }
    yield `} else {`
    yield* parseBody(options[n].body)
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
        yield `${fname}();`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}");`
    }
}

function* fdecl({name, params, returns, body}) {
    yield `${returns} ${name}() {`
    yield* parseBody(body)
    if (name === 'main') {
        yield '  return 0;'
    }
    yield '}'
}

function* decl({name, type, expr}) {
    yield `${type} ${name} = ${parseExpr(expr)};`
}

module.exports = {
    C
}
