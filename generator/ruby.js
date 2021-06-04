const fmap = new Map([
    ['print', 'puts']
])

function* main({stmts}, parseBody) {
    yield 'def main()'
    yield* parseBody(stmts)
    yield 'end'
    yield ''
    yield 'main'
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
    yield `${fname} "${params[0]}"`
}

function* fdecl({name, params, body}) {
    yield `def ${name}()`
    yield `end`    
}

const ruby = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `def ${name}()`,
        `end`
    ],

    decl: ({name, type, value}) => `${name} = ${value}`,

    main,
    cond,
    fcall,
    fdecl
}

module.exports = {
    ruby
}
