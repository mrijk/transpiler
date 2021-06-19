const {isEmpty, join} = require('lodash')

const kotlin = {
    language: 'Kotlin',
    extionsion: 'kt',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl,
    lambda,
    package
}

const {parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(kotlin)

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `// ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* cond1([{predicate, body}]) {
    yield `if (${parsePredicate(predicate)}) {`
    yield* parseBody(body)
    yield '}'   
}

function* cond2(options) {
    yield `if (${parsePredicate(options[0].predicate)}) {`
    yield* parseBody(options[0].body)
    yield `} else {`
    yield* parseBody(options[1].body)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
 
    yield `when {`
    for (i = 0; i < n; i++) {
        const {predicate, body} = options[i]
        yield `${parsePredicate(predicate)} -> ${Array.from(parseBody(body, -1))}`
    }
    yield `  else -> ${Array.from(parseBody(options[n].body, -1))}`
    yield '}'
}

function* cond({options}) {
    switch (options.length) {
    case 1:
        yield *cond1(options)
        break
    case 2:
        yield *cond2(options)
        break
    default:
        yield *condn(options)
    }
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname}("${params[0]}")`
}

function* fdecl({name, params, body}) {
    yield `fun ${name}() {`
    yield* parseBody(body)
    yield '}'
}

function* decl({name, type, expr}) {
    yield `val ${name} = ${parseExpr(expr)}`
}

function* lambda({params, body}) {
    const parsedBody = Array.from(parseBody(body, -1))
    yield `{ ${parsedBody} }`
}

module.exports = {
    kotlin
}
