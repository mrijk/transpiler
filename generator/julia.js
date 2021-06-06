const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'println']
])

function comment(comment) {
    return `# ${comment}`
}

function* cond({options}) {
    const count = options.length

    yield `if ${options[0].predicate}`
    yield `  ${options[0].expr}`
    for (i = 1; i < count - 1; i++) {
        const {predicate, expr} = options[i]
        yield `elseif ${predicate}`
        yield `  ${expr}`
    }
    yield `else`
    yield `  ${options[count - 1].expr}`
    yield `end`
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

const julia = {
    language: 'Julia',
    
    decl: ({name, type, value}) => `${name} = ${value}`,

    comment,    
    cond,
    fcall,
    fdecl
}

module.exports = {
    julia
}
