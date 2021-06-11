const {isEmpty, join} = require('lodash')

const rust = {
    language: 'Rust',
    extension: 'rs',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

const {parseBody, parseFunctions} = require('./shared/shared')(rust)

const fmap = new Map([
    ['print', 'println!']
])

function comment(comment) {
    return `// ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions)
}

function* cond1(options) {
    yield `if ${options[0].predicate} {`
    yield* parseBody(options[0].body)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
    yield `if ${options[0].predicate} {`
    yield* parseBody(options[0].body)
    yield '}'
    for (i = 1; i < n; i++) {
        yield `else if ${options[i].predicate} {`
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
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}")`
    }
}

function* fdecl({name, params, body}) {
    yield `fn ${name}() {`
    yield* parseBody(body)
    yield '}'
}

function* decl({name, type, value}, level) {
    yield `let ${name} = ${value};`
}

module.exports = {
    rust
}
