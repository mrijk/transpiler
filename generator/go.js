const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `# ${comment}`
}

function* cond({options}) {
    yield `if ${options[0].predicate} {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield `}`
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname}("${params[0]}")`
}
function* fdecl({name, params, body}) {
    yield `func ${name}() {`
    yield* parseBody(body, go)
    yield '}'
}

function* decl({name, type, value}) {
    yield `var ${name} ${type} = ${value}`
}

const go = {
    language: 'Go',
    extension: 'go',

    comment,
    cond,
    decl,
    fcall,
    fdecl
}

module.exports = {
    go
}
