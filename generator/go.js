const fmap = new Map([
    ['print', 'println']
])

function* main({stmts}, parseBody) {
    yield 'package main'
    yield ''
    yield 'func main() {'
    yield* parseBody(stmts)
    yield '}'
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

const go = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `func ${name}() {`,
        `}`
    ],

    decl: ({name, type, value}) => `var ${name} ${type} = ${value}`,
    
    main,
    cond,
    fcall
}

module.exports = {
    go
}
