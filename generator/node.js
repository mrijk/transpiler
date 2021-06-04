const fmap = new Map([
    ['print', 'console.log']
])

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
    
    main: {
        start: 'function main() {',
        end: '}\n\n' +
            'main()'
    },

    
    decl: ({name, type, value}) => `const ${name} = ${value}`,
    
    cond,
    fcall
}

module.exports = {
    node
}
