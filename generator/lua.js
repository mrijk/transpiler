// node index.js | lua

const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `-- ${comment}`
}

function* cond1(options) {
    yield `if ${options[0].predicate} then`
    yield `  ${options[0].expr}`
    yield 'end'
}

function* condn(options) {
    const n = options.length
    yield `if ${options[0].predicate} then`
    yield `  ${options[0].expr}`
    for (i = 1; i < n -1; i++) {
        yield `elseif ${options[i].predicate} then`
        yield `  ${options[i].expr}`
        if (i != n - 2)
            yield 'end'
    }
    yield `else`
    yield `  ${options[n - 1].expr}`
    yield 'end'
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

function* fdecl({name, params, returns, body}) {
    yield `function ${name} ()`
    yield* parseBody(body, lua)
    yield 'end'
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

function* decl({name, type, value}) {
    yield `${name} = ${value}`
}

const lua = {
    language: 'Lua',
    extension: 'lua',

    comment,
    cond,
    decl,
    fcall,
    fdecl
}

module.exports = {
    lua
}
