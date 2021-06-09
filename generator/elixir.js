const {isEmpty, join} = require('lodash')

const {indent, parseBody, parseFunctions} = require('./shared/shared')

const fmap = new Map([
    ['print', 'IO.puts']
])

function comment(comment) {
    return `# ${comment}`
}

function* package({functions}) {
    yield 'defmodule ExampleApp.CLI do'
    yield* parseFunctions(functions, elixir, 1)
    yield 'end'
}

function* cond({options}) {
    yield `if ${options[0].predicate} do`
    yield `  ${options[0].expr}`
    yield `else`
    yield `  ${options[1].expr}`
    yield `end`
}

function* fcall({name, params}) {
    const fname = fmap.get(name) || name
    if (isEmpty(params)) {
        yield `${fname}()`
    } else {
        const paramString = join(params)
        yield `${fname}("${paramString}")`
    }
}

function* fdecl({name, params, body}) {
    yield `defp ${name}() do`
    yield* parseBody(body, elixir)
    yield `end`    
}

function* decl({name, type, value}) {
    yield `${name} = ${value}`
}

const elixir = {
    language: 'Elixir',
    extension: 'ex',
    
    comment,
    cond,
    decl,
    fcall,
    fdecl,
    package
}

module.exports = {
    elixir
}
