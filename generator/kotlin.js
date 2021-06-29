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
    mcall,
    package,
    seq
}

const {parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(kotlin)
const {methodLookup} = require('./shared/util')

const fmap = new Map([
    ['print', 'println']
])

const omap = new Map([
    ['string', new Map([
        ['length', 'length']   
    ])]
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
    if (isEmpty(params)) {
        yield `${fname}()`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}")`
    }

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

function* mcall({name, type, obj, params}) {
    const mname = methodLookup(omap, name, type)
    
    if (isEmpty(params)) {
        yield `${obj}.${mname}`
    } else {
        const paramString = join(params.map(param => parseExpr(param)))

        yield `${obj}.${mname}(${paramString})`
    }
}

function* seq({values}) {
    const paramString = join(values.map(value => `"${value}"`))
    yield `listOf(${paramString})`
}

module.exports = {
    kotlin
}
