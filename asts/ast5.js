// ast3: simple if/then/elseif/else

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
                                    expr: "y = 0"
                                },
                                {
                                    predicate: "x < 7",
                                    expr: "y = 1"
                                },
                                {
                                    expr: "y = 2"
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
