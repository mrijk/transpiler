const {parseBody} = require('./shared/shared')

const fmap = new Map([
    ['print', 'console.log']
])

function comment(comment) {
    return `// ${comment}`
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
    language: 'Node',

    decl: ({name, type, value}) => `const ${name} = ${value}`,

    comment,
    cond,
    fcall,
    fdecl
}

module.exports = {
    node
}
