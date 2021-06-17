// node index.js | python

const {isEmpty, join} = require('lodash')

const python = {
    language: 'Python',
    extension: 'py',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl,
    lambda,
    package
}

const {parseBody, parseExpr, parseFunctions, parsePredicate} = require('./shared/shared')(python)

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
    yield `if ${options[0].predicate}:`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        yield `elif ${options[i].predicate}:`
        yield* parseBody(options[i].body)
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
    if (isEmpty(params)) {
        yield `${fname}()`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}")`
    }
}

function* fdecl({name, params, body}) {
    yield `def ${name}():`
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

module.exports = {
    python
}
