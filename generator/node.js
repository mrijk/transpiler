const {parseBody} = require('./shared/shared')

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
    const paramString = _.join(params)
    yield `${fname}("${paramString}")`
}

function* fdecl({name, params, body}) {
    yield `function ${name}() {`
    yield* parseBody(body, node)
    yield `}`
    if (name === 'main') {
        yield ''
        yield 'main()'
    }
}

const node = {
    comment: comment => `// ${comment}`,


    functionDecl: ({name, params, body}) => [
        `function ${name}() {`,
        `}`
    ],
    
    decl: ({name, type, value}) => `const ${name} = ${value}`,
    
    cond,
    fcall,
    fdecl
}

module.exports = {
    node
}
