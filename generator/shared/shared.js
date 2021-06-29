const {isEmpty, isString, join, map, partial} = require('lodash')

function* parseStmt(stmt, generator) {
    switch (stmt.t) {
    case 'cond':
        yield* generator.cond(stmt)
        break
    case 'decl':
        yield* generator.decl(stmt)
        break
    case 'fcall':
        yield* generator.fcall(stmt)
        break
    case 'mcall':
        yield* generator.mcall(stmt)
        break;
    case 'return':
        if (generator.returns)
            yield* generator.returns(stmt.expr)
        else
            yield parseExpr(generator, stmt.expr)
        break;
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

function parseExpr(generator, expr) {
    switch (expr.t) {
    case 'const':
        return expr.value
    case 'fcall':
        return Array.from(generator.fcall(expr))
    case 'lambda':
        return Array.from(generator.lambda(expr))
    case 'seq':
        return Array.from(generator.seq(expr))
    default:
        return expr.value
    }
}

function parsePredicate(generator, {op, expr1, expr2}) {
    return `${parseExpr(generator, expr1)} ${op} ${parseExpr(generator, expr2)}`
}

function callParamsToString(generator, params) {
    return join(map(params, expr => {
        const {t, value} = expr
        switch (t) {
        case 'const':
            return isString(value) ? `"${value}"` : value
        case 'fcall':
            return `${parseExpr(generator, expr)}`
        default:
            return value
        }
    }))
}

function indent(level, s) {
    return ' '.repeat(level * 2) + s
}

function shared(gen) {
    return {
        callParamsToString: partial(callParamsToString, gen),
        parseBody: partial(parseBody, gen),
        parseExpr: partial(parseExpr, gen),
        parseFunctions: partial(parseFunctions, gen),
        parsePredicate: partial(parsePredicate, gen)
    }
}

module.exports = shared
