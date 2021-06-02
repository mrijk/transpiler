function cond({options}) {
    const count = options.length

    switch (count) {
    case 1:
        return [
            `if (${options[0].predicate}) {`,
            `  ${options[0].expr}`,
            '}'
        ]
    case 2:
        return [
            `if (${options[0].predicate}) {`,
            `  ${options[0].expr}`,
            `} else {`,
            `  ${options[1].expr}`,
            `}`
        ]
    default:
        return [
            `when {`,
            `    else -> ${options[count - 1].expr}`,
            '}'
        ]
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

    cond: cond    
}

module.exports = {
    kotlin
}
