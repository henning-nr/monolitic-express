var axios = require('axios')

async function personCT(){
	let persons = []
		await axios.get('http://localhost:4000/api/pessoas').then((r)=>{
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
			// console.log('aux',pessoaAux)
		persons = pessoaAux
	})

			console.log('person',persons)
	return persons
}

module.exports = personCT;