const fmap = new Map([
    ['print', 'console.log']
])

function* main({stmts}, parseBody) {
    yield 'function main() {'
    yield* parseBody(stmts)
    yield '}'
    yield ''
    yield 'main()'
}

function cond({options}) {
    if (options.count == 2) {
        return [
            `if (${options[0].predicate}) {`,
            `  ${options[0].expr}`,
            `} else {`,
            `  ${options[1].expr}`,
            `}`
        ]
    } else {
        return []
    }
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    yield `${fname}("${params[0]}")`
}

const node = {
    comment: comment => `// ${comment}`,


    functionDecl: ({name, params, body}) => [
        `function ${name}() {`,
        `}`
    ],
    
    decl: ({name, type, value}) => `const ${name} = ${value}`,
    
    main,
    cond,
    fcall
}

module.exports = {
    node
}
