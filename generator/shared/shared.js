const {partial} = require('lodash')

function* parseStmt(stmt, generator) {
    switch (stmt.t) {
    case 'cond':
        yield* generator.cond(stmt)
        break
    case 'fcall':
        yield* generator.fcall(stmt)
        break
    case 'decl':
        yield* generator.decl(stmt)
        break
    }
}

function* parseBody(generator, {stmts}, level = 0) {
    yield* stmts
        .flatMap(stmt => Array.from(parseStmt(stmt, generator))
                 .map(s => indent(level + 1, s)))
}

function* parseFunction(f, generator) {
    if (generator.fdecl) {
        yield* generator.fdecl(f)
        yield ""
    } else {
        yield generator.comment('fdecl not implemented yet!')
    }
}

function* parseFunctions(generator, functions, level = 0) {
    yield* functions.flatMap(func => Array.from(parseFunction(func, generator))
                             .map(s => indent(level, s)))
}

function parseExpr({t, value}) {
    return value
}

function parsePredicate(generator, {op, expr1, expr2}) {
    return `${parseExpr(expr1)} ${op} ${parseExpr(expr2)}`
}

function indent(level, s) {
    return  ' '.repeat(level * 2) + s
}

function shared(gen) {
    return {
        parseBody: partial(parseBody, gen),
        parseFunctions: partial(parseFunctions, gen),
        parsePredicate: partial(parsePredicate, gen)
    }
}

module.exports = shared
