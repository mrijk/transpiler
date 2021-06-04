// node index.js | gcc -x c -

const fmap = new Map([
    ['print', 'printf']
])

function* main({stmts}, parseBody) {
    yield '#include <stdio.h>'
    yield ''
    yield 'int main() {'
    yield* parseBody(stmts)
    yield 'return 0;'
    yield '}'
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
    yield `${fname}("${params[0]}");`
}

const C = {
    comment: comment => `/* ${comment} */`,


    functionDecl: ({name, params, body}) => [
        `void ${name}() {`,
        `}`
    ],

    decl: ({name, type, value}) => `var ${name} = ${value}`,

    main,
    cond,
    fcall
}

module.exports = {
    C
}
