const ast = {
    functions: [
        {name: "funtionOne",
         params: [],
         body: []
        }
    ],
    
    main: {
        stmts: [
            {
                type: "fcall",
                name: "print",
                params: [
                    "Hello world!"
                ]
            }
        ]
    }
}

module.exports = {
    ast
}
