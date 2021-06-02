const ast = {
    functions: [
    ],
    
    main: {
        decl: {
            name: "x",
            type: "int",
            value: "5"
        },
        cond: {
            options: [
                {
                    predicate: "x < 5",
                    expr: "0"
                },
                {
                    predicate: "x < 10",
                    expr: "1"
                },
                {
                    expr: "2"
                }
            ]
        }
    }
}

module.exports = {
    ast
}
