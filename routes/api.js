var express = require('express');
var router = express.Router();
var axios = require('axios')


router.get("/pessoas/", function(req, res, next) {

	console.log("LISTANDO")
	axios.get('http://localhost:3000/pessoas').then((r) => {
		res.send(r.data)
	})
})


router.get("/pessoas/:id", function(req, res, next) {

	console.log("EDITANDO API")
	axios.get('http://localhost:3000/pessoas/' + req.params.id).then((r) => {
		res.send(r.data)
	})
})


router.delete("/pessoas/:id", function(req, res, next) {
	eventEmitter.emit('itemDeleted', { id: req.params.id });
	axios.delete('http://localhost:3000/pessoas/' + req.params.id).then((r) => {
		console.log("DELETANDO FEITO")
		axios.get('http://localhost:4000/api/pessoas').then((r) => {
			// aqui eu mostro meus dados
			pessoaAux = r.data.map((pessoa) => {
				pessoa = {
					id: pessoa.id,
					nome: pessoa.nome,
					signo: pessoa.signo,
					sangue: pessoa.tipo_sanguineo
				}
				return pessoa
			})
			// Colunas da tabela
			let cols = ['ID', 'NOME', 'SIGNO', 'SANGUE', 'AÇÕES']
			// renderizando index e passando o objeto pessoas
			res.render('person', { pessoas: pessoaAux, cols: cols });
		})
	})
})