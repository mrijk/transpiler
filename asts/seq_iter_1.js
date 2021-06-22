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
                                    params: [
                                        {
                                            name: "s",
                                            type: "string"
                                        }
                                    ],
                                    body: {
                                        stmts: [
                                            {
                                                t: "mcall",
                                                name: "length",
                                                obj: "s",
                                                type: "string",
                                                params: []
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
