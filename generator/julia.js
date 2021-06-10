// node index.js | julia

const {isEmpty, join} = require('lodash')

const {parseBody, parseFunctions} = require('./shared/shared')

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `# ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions, julia)
}

function* cond1(options) {
    yield `if ${options[0].predicate} {`
    yield* parseBody(options[0].body, julia)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
    yield `if ${options[0].predicate}`
    yield* parseBody(options[0].body, julia)
    for (i = 1; i < n; i++) {
        yield `elseif ${options[i].predicate}`
        yield* parseBody(options[i].body, julia)
    }
    yield `else`
    yield* parseBody(options[n].body, julia)
    yield `end`
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
    yield `function ${name}()`
    yield* parseBody(body, julia)
    yield 'end'
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, value}) {
    yield `${name} = ${value}`
}

const julia = {
    language: 'Julia',
    extension: 'jl',
    
    comment,    
    cond,
    decl,
    fcall,
    fdecl,
    package
}

module.exports = {
    julia
}
