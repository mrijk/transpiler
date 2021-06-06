const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'puts']
])

function comment(comment) {
    return `# ${comment}`
}

function* cond({options}) {
    yield `if ${options[0].predicate}`
    yield `  ${options[0].expr}`
    yield `else`
    yield `  ${options[1].expr}`
    yield `end`
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

const ruby = {
    language: 'Ruby',
    
    decl: ({name, type, value}) => `${name} = ${value}`,

    comment,
    cond,
    fcall,
    fdecl
}

module.exports = {
    ruby
}
