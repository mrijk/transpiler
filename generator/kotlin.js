const fmap = new Map([
    ['print', 'println']
])

function* main({stmts}, parseBody) {
    yield 'fun main() {'
    yield* parseBody(stmts)
    yield '}'
}

function* cond({options}) {
    const count = options.length

    switch (count) {
    case 1:
        yield `if (${options[0].predicate}) {`
        yield `  ${options[0].expr}`
        yield '}'
    case 2:
        yield `if (${options[0].predicate}) {`
        yield `  ${options[0].expr}`
        yield `} else {`
        yield `  ${options[1].expr}`
        yield `}`
    default:
        yield `when {`
        for (i = 0; i < count -1; i++) {
            yield `  ${options[i].predicate} -> ${options[i].expr}`
        }
        yield `  else -> ${options[count - 1].expr}`
        yield '}'
    }
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname}("${params[0]}")`
}

const kotlin = {
    comment: comment => `// ${comment}`,

    functionDecl: ({name, params, body}) => [
        `fun ${name}() {`,
        `}`
    ],
    
    decl: ({name, type, value}) => `val ${name} = ${value}`,

    main,
    cond,
    fcall
}

module.exports = {
    kotlin
}
