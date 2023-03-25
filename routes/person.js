var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {

axios.get('/api/pessoas').then((r)=>{
		// aqui eu mostro meus dados
		pessoaAux = r.data.map((pessoa)=>{
			pessoa = {
				id: pessoa.id,
				nome: pessoa.nome,
				signo: pessoa.signo,
				sangue: pessoa.tipo_sanguineo
			}
			return pessoa
		})
		// Colunas da tabela
		let cols = ['ID','NOME','SIGNO','SANGUE','AÇÕES']
		// renderizando index e passando o objeto pessoas
  	res.render('person', { pessoas: pessoaAux, cols:cols });
	})	
});


router.get("/edit/:id",function(req,res,next) {

	console.log("EDITANDO A ROTA")
axios.get('/api/pessoas/'+req.params.id).then((r)=>{
	res.send(r.data)
})
})


router.delete("/delete/:id",function(req,res,next) {
axios.delete('http://localhost:4000/api/pessoas/'+req.params.id).then((r)=>{
		res.send(r.data)
})
})	