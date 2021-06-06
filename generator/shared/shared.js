function* parseStmt(stmt, generator) {
    if (stmt.type === 'fcall') {
        yield* generator.fcall(stmt)
    }
}

function* parseBody({stmts}, generator) {
    yield* stmts.map(stmt => Array.from(parseStmt(stmt, generator)))
}

module.exports = {
    parseBody
}
