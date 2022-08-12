const http = require("http");

http
.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    if(request.url === "/produto") {
        response.end(
            JSON.stringify({
            message: "Rota de Produto",
        }));
    }

    if(request.url === "/usuarios") {
        response.end(
            JSON.stringify({
                message: "Rota usuario",
            })
        );
    }

    response.end(JSON.stringify({
        message: "Qualquer coisa",
    }))

})
.listen(4001, () => console.log("Servidor rodando na porta 4001"));
