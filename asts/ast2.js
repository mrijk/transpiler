// ast2: simple if/then

const ast = {
    package: {
        name: 'main',
        file: '',
        functions: [
            {
                name: 'main',
                params: [],
                returns: "int",
                body: {
                    stmts: [
                        {
                            t: "decl",
                            name: "x",
                            type: "int",
                            value: "5"
                        },
                        {
                            t: "cond",
                            options: [
                                {
                                    predicate: "x < 5",
                                    expr: "0"
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }
}

module.exports = {
    ast
}
