const {isEmpty, join} = require('lodash')

const kotlin = {
    language: 'Kotlin',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

const {parseBody, parseFunctions} = require('./shared/shared')(kotlin)

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `// ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* cond1(options) {
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body)
    yield '}'   
}

function* cond2(options) {
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body)
    yield `} else {`
    yield* parseBody(options[0].body)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
 
    yield `when {`
    for (i = 0; i < n; i++) {
        yield `  ${options[i].predicate} -> ${parseBody(options[i].body)}`
    }
    yield `  else -> ${parseBody(options[n].body)}`
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

function* decl({name, type, value}, level) {
    yield `val ${name} = ${value}`
}

module.exports = {
    kotlin
}
