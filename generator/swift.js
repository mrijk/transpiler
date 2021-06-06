const {isEmpty, join} = require('lodash')

const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'print']
])

function comment(comment) {
    return `# ${comment}`
}

function* main({stmts}, parseBody) {
    yield 'func main() {'
    yield* parseBody(stmts)
    yield '}'
}

function* cond({options}) {
    yield `if ${options[0].predicate} {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield '}'
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
    yield `func ${name}() {`
    yield* parseBody(body, swift)
    yield `}`
}

const swift = {
    language: 'Swift',

    decl: ({name, type, value}) => `var ${name} = ${value}`,

    comment,
    main,
    cond,
    fcall,
    fdecl
}

module.exports = {
    swift
}
