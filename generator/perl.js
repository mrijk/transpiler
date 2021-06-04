const fmap = new Map([
    ['print', 'print']
])

function* main({stmts}, parseBody) {
    yield 'sub Main() {'
    yield* parseBody(stmts)
    yield '}'
    yield ''
    yield 'Main()'
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
    yield `${fname} "${params[0]}";`
}

const perl = {
    comment: comment => `# ${comment}`,


    functionDecl: ({name, params, body}) => [
        `sub ${name}() {`,
        `}`
    ],
    
    decl: ({name, type, value}) => `var ${name} = ${value}`,

    main,
    cond,
    fcall
}

module.exports = {
    perl
}
