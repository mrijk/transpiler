// node index.js | node

const {isEmpty, isString, join, map} = require('lodash')

const node = {
    language: 'Node',
    extension: 'js',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    lambda,
    mcall,
    package,
    returns,
    seq
}

const {callParamsToString, parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(node)
const {methodLookup} = require('./shared/util')

const fmap = new Map([
    ['print', 'console.log']
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

function* condn(options) {
    const n = options.length - 1
    yield `if (${parsePredicate(options[0].predicate)}) {`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        const {predicate, body} = options[i]
        yield `} else if (${parsePredicate(predicate)}) {`
        yield* parseBody(body)
    }
    yield `} else {`
    yield* parseBody(options[n].body)
    yield '}'
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
    const paramString = callParamsToString(params)
    yield `${fname}(${paramString})`
}

function paramsToString(params) {
    return (isEmpty(params)) ? "" : params[0].name
}

function* fdecl({name, params, body}) {
    const paramString = paramsToString(params)
    yield `function ${name}(${paramString}) {`
    yield* parseBody(body)
    yield `}`
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, expr}) {
    yield `const ${name} = ${parseExpr(expr)}`
}

function* lambda({params, body}) {
    const parsedBody = Array.from(parseBody(body, -1))
    const paramString = paramsToString(params)
    
    if (parsedBody.length === 1) {
        yield `(${paramString}) => ${parsedBody}`
    } else {
        yield `() => {${parsedBody}}`
    }
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

function *returns(expr) {
    yield `return ${parseExpr(expr)}`
}

function* seq({values}) {
    const paramString = join(values.map(value => `"${value}"`))
    yield `[${paramString}]`
}

module.exports = {
    node
}
