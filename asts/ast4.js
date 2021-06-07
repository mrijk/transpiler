const ast = {
    package: {
        name: 'main',
        file: '',
        functions: [
            {
                name: "functionOne",
                params: [],
                returns: "void",
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
                                },
                                {
                                    expr: "1"
                                }
                            ]
                        },
                        {
                            t: "fcall",
                            name: "print",
                            params: [
                                "Hello from functionOne!"
                            ]
                        }
                    ]
                }
            },
            {
                name: 'main',
                params: [],
                returns: "int",
                body: {
                    stmts: [
                        {
                            t: "fcall",
                            name: "functionOne",
                            params: []
                        },
                        {
                            t: "fcall",
                            name: "print",
                            params: [
                                "Hello world!"
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
