const {isEmpty, join} = require('lodash')

const {indent, parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `# ${comment}`
}

function* cond({options}) {
    yield `if ${options[0].predicate}:`
    yield `  ${options[0].expr}`
    yield `else:`
    yield `  ${options[1].expr}`
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
    yield* parseBody(body, python)
    if (name === 'main') {
        yield ''
        yield 'if __name__ == "__main__":'
        yield '  main()'
    }
}

function* decl({name, type, value}) {
    yield `${name} = ${value}`
}

const python = {
    language: 'Python',
    extension: 'py',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl
}

module.exports = {
    python
}
