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

    cond: ({options}) =>
    [
        `if (${options[0].predicate}) {`,
        `  ${options[0].expr}`,
        `} else {`,
        `  ${options[1].expr}`,
        `}`
    ] 
}

module.exports = {
    kotlin
}
