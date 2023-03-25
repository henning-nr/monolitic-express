var express = require('express');
var router = express.Router();
var axios = require('axios')
var EventEmitter = require('events');
var eventEmitter = new EventEmitter();

/* GET home page. */
router.get('/', function(req, res, next) {
		// rendrizando index e passando o objeto pessoas
  	res.render('index', { pessoas: 'nome' });
});


router.get('/person', function(req, res, next) {
axios.get('http://localhost:4000/api/pessoas').then((r)=>{
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


router.get("/api/pessoas/",function(req,res,next) {
axios.get('http://localhost:3000/pessoas').then((r)=>{
	res.send(r.data)
})
})

router.get("/pessoas/edit/:id",function(req,res,next) {
axios.get('http://localhost:4000/api/pessoas/'+req.params.id).then((r)=>{
	res.send(r.data)
})
})

router.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  eventEmitter.on('itemDeleted', (data) => {
    res.write(`event: itemDeleted\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
  eventEmitter.on('itemUpdated', (data) => {
    res.write(`event: itemUpdated\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});



router.get("/api/pessoas/:id",function(req,res,next) {
axios.get('http://localhost:3000/pessoas/'+req.params.id).then((r)=>{
	res.send(r.data)
})
})


router.patch("/pessoas/update/:id",function(req,res,next) {
	eventEmitter.emit('itemUpdated', { id: req.params.id });
axios.patch('http://localhost:4000/api/pessoas/'+req.params.id,req.body).then((r)=>{
	res.send(r.data)
})
})	


router.patch("/api/pessoas/:id",function(req,res,next) {
axios.patch('http://localhost:3000/pessoas/'+req.params.id,req.body).then((r)=>{
				axios.get('http://localhost:4000/api/pessoas').then((r)=>{
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
})
})


router.delete("/pessoas/delete/:id",function(req,res,next) {
axios.delete('http://localhost:4000/api/pessoas/'+req.params.id).then((r)=>{
		res.send(r.data)
})
})	


router.delete("/api/pessoas/:id",function(req,res,next) {
	eventEmitter.emit('itemDeleted', { id: req.params.id });
axios.delete('http://localhost:3000/pessoas/'+req.params.id).then((r)=>{
				axios.get('http://localhost:4000/api/pessoas').then((r)=>{
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
})
})
module.exports = router;
