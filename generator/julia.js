// node index.js | julia

const {isEmpty, join} = require('lodash')

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

const {parseBody, parseFunctions, parsePredicate} = require('./shared/shared')(julia)

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `# ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* cond1([{predicate, body}]) {
    yield `if ${parsePredicate(predicate)} {`
    yield* parseBody(body)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
    yield `if ${options[0].predicate}`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        yield `elseif ${options[i].predicate}`
        yield* parseBody(options[i].body)
    }
    yield `else`
    yield* parseBody(options[n].body)
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
    yield* parseBody(body)
    yield 'end'
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, value}) {
    yield `${name} = ${value}`
}

module.exports = {
    julia
}
