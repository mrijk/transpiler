// node index.js | python

const {isEmpty, isString, join, map} = require('lodash')

const python = {
    language: 'Python',
    extension: 'py',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl,
    lambda,
    package,
    returns
}

const {callParamsToString, parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(python)

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `# ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* cond1([{predicate, body}]) {
    yield `if ${parsePredicate(predicate)}:`
    yield* parseBody(body)
}

function* condn(options) {
    const n = options.length - 1
    yield `if ${parsePredicate(options[0].predicate)}:`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        const {predicate, body} = options[i]
        yield `elif ${parsePredicate(predicate)}:`
        yield* parseBody(body)
    }
    yield `else:`
    yield* parseBody(options[n].body)
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
    yield `def ${name}(${paramString}):`
    yield* parseBody(body)
    if (name === 'main') {
        yield ''
        yield 'if __name__ == "__main__":'
        yield '  main()'
    }
}

function* decl({name, type, expr}) {
    yield `${name} = ${parseExpr(expr)}`
}

function* lambda({params, body}) {
    const parsedBody = Array.from(parseBody(body, -1))
    yield `lambda : ${parsedBody}`
}

function* returns(expr) {
    yield `return ${parseExpr(expr)}`
}

module.exports = {
    python
}
