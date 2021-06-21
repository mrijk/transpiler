// seq_iter_1: iterate over a sequence using a lambda function

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
                        // l = seq("aap", "noot", "mies")
                        {
                            t: "decl",
                            name: "l",
                            type: "seq",
                            expr: {
                                t: "seq",
                                values: ["aap", "noot", "mies"]
                            }
                        },
                        {
                            t: "mcall",
                            name: "map",
                            obj: "l",
                            params: [
                                {
                                    t: "lambda",
                                    params: [],
                                    body: {
                                        stmts: [
                                            {
                                                t: "return",
                                                expr: {
                                                    t: "const",
                                                    value: "5"
                                                }
                                            }
                                        ]
                                    }
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
