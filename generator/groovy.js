const fmap = new Map([
    ['print', 'println']
])

function* main({stmts}, parseBody) {
    yield 'def main() {'
    yield* parseBody(stmts)
    yield '}'
    yield ''
    yield 'main()'
}

function* cond({options}) {
    yield `if (${options[0].predicate}) {`
    yield `  ${options[0].expr}`
    yield `} else {`
    yield `  ${options[1].expr}`
    yield `}`
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname} "${params[0]}"`
}

const groovy = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `def ${name}() {`,
        `}`
    ],
    
    decl: ({name, type, value}) => `def ${name} = ${value}`,

    main,
    cond,
    fcall
}

module.exports = {
    groovy
}
