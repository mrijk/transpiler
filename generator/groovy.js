//

const {isEmpty, join} = require('lodash')

const groovy = {
    language: 'Groovy',
    extension: 'groovy',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl,
    lambda,
    package
}

const {parseBody, parseExpr, parseFunctions} = require('./shared/shared')(groovy)

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `// ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* condn(options) {
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body)
    yield '}'   
}

function* condn(options) {
    const n = options.length - 1
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body)
    yield '}'
    for (i = 1; i < n; i++) {
        yield `else if (${options[i].predicate}) {`
        yield* parseBody(options[i].body)
        yield '}'
    }
    yield `else {`
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
        yield `${fname}`
    } else {
        const paramString = join(params)
        yield `${fname} "${paramString}"`
    }
}

function* fdecl({name, params, body}) {
    yield `def ${name}() {`
    yield* parseBody(body)
    yield '}'
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, expr}) {
    yield `def ${name} = ${parseExpr(expr)}`
}

function* lambda({params, body}) {
    const parsedBody = Array.from(parseBody(body, -1))
    yield `{${parsedBody}}`
}

module.exports = {
    groovy
}
