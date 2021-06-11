// node index.js | node

const {isEmpty, join} = require('lodash')

const node = {
    language: 'Node',
    extension: 'js',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

const {parseBody, parseFunctions} = require('./shared/shared')(node)

const fmap = new Map([
    ['print', 'console.log']
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

function* condn(options) {
    const n = options.length - 1
    yield `if (${options[0].predicate}) {`
    yield* parseBody(options[0].body)
    for (i = 1; i < n; i++) {
        yield `} else if (${options[i].predicate}) {`
        yield* parseBody(options[i].body)
        if (i != n - 1)
            yield '}'
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
    const paramString = join(params)
    yield `${fname}("${paramString}")`
}

function* fdecl({name, params, body}) {
    yield `function ${name}() {`
    yield* parseBody(body)
    yield `}`
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, value}) {
    yield `const ${name} = ${value}`
}

module.exports = {
    node
}
