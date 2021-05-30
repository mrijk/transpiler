const ast = {
    functions: [
        {name: "funtionOne",
         params: [],
         body: []
        }
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
                    expr: "1"
                }
            ]
        }
    }
}

module.exports = {
    ast
}
