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

const kotlin = {
    comment: comment => `// ${comment}`,

    functionDecl: ({name, params, body}) => [
        `fun ${name}() {`,
        `}`
    ],
    
    main: {
        start: 'fun main() {',
        end  : '}'
    },

    decl: ({name, type, value}) => `val ${name} = ${value}`,

    cond
}

module.exports = {
    kotlin
}
