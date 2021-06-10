// node index.js | ruby

const {isEmpty, join, partialRight} = require('lodash')

const {parseBody, parseFunctions} = require('./shared/shared')

const fmap = new Map([
    ['print', 'puts']
])

function comment(comment) {
    return `# ${comment}`
}

function* package({functions}) {
    yield* parseFunctions(functions, ruby)
}

function* cond1(options) {
    yield `if ${options[0].predicate} {`
    yield* parseBody(options[0].body, ruby)
    yield `}`
}

function* condn(options) {
    const n = options.length - 1
    yield `if ${options[0].predicate}`
    yield* parseBody(options[0].body, ruby)
    for (i = 1; i < n; i++) {
        yield `elseif ${options[i].predicate}`
        yield* parseBody(options[i].body, ruby)
    }
    yield `else`
    yield* parseBody(options[n].body, ruby)
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
        yield `${fname}`
    } else {
        const paramString = join(params)
        yield `${fname} "${paramString}"`
    }
}

function* fdecl({name, params, body}) {
    yield `def ${name}()`
    yield* parseBody(body, ruby)
    yield `end`
    if (name === 'main') {
        yield ''
        yield 'main'
    }
}

function* decl({name, type, value}) {
    yield `${name} = ${value}`
}

const ruby = {
    language: 'Ruby',
    extension: 'rb',

    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

module.exports = {
    ruby
}
