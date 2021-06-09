// node index.js | node

const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'console.log']
])

function comment(comment) {
    return `// ${comment}`
}

function* cond1(options) {
    yield `if (${options[0].predicate}) {`
    yield `  ${options[0].expr}`
    yield '}'
}

function* cond2(options) {
    yield `if (${options[0].predicate}) {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield `}`
 }

function* condn(options) {
    const n = options.length
    yield `if (${options[0].predicate}) {`
    yield `  ${options[0].expr}`
    for (i = 1; i < n -1; i++) {
        yield `} else if (${options[i].predicate}) {`
        yield `  ${options[i].expr}`
        if (i != n - 2)
            yield '}'
    }
    yield `} else {`
    yield `  ${options[n - 1].expr}`
    yield '}'
}

function* cond({options}) {
    switch (options.length) {
    case 1:
        yield* cond1(options)
        break
    case 2:
        yield* cond2(options)
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
    yield* parseBody(body, node)
    yield `}`
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, value}) {
    yield `const ${name} = ${value}`
}

const node = {
    language: 'Node',
    extension: 'js',

    comment,
    cond,
    decl,
    fcall,
    fdecl
}

module.exports = {
    node
}
