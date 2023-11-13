// Função editar
function editar(id) {
	$('#loading2').addClass("active");
	$('#id').val('');
	$('#nome').val('');
	$('#sangue').val('');
	$('#signo').val('');

	$.ajax({
		url: 'pessoas/edit/' + id,
		type: 'GET',
		success: function(result) {
			// Do something with the result
			$('#id').val(result.id);
			$('#id').prop('disabled', true);
			$('#nome').val(result.nome);
			$('#sangue').val(result.tipo_sanguineo);
			$('#signo').val(result.signo);
			$('#loading2').removeClass("active");
		}
	});
}
// Função editar
function salvar() {
	// $('#loading2').addClass("active");
	$('#id').hide();
	$('#nome').val('');
	$('#sangue').val('');
	$('#signo').val('');

}
// Função deletar
function deletar(id) {
	$('#loading').addClass("active");
	$.ajax({
		url: 'pessoas/delete/' + id,
		type: 'DELETE',
		success: function(result) {
			// Do something with the result
			$('#content').html(result)
			$('#loading').removeClass("active");

		}
	});
}

// Função editar
function editarPessoa() {
	if($('#id').val() == ""){
		salvarPessoa()
		return
	}
	id = $("#id").val()
	$('#loading').addClass("active");
	let data = {
		nome: $('#nome').val(),
		tipo_sanguineo: $('#sangue').val(),
		signo: $('#signo').val()
	}

	$.ajax({
		url: 'pessoas/update/' + id,
		type: 'PATCH',
		data: data,
		success: function(result) {
			// Do something with the result
			$('#content').html(result)
			$('#loading').removeClass("active");

		},
		error: function(result) {
			// Do something with the result
			$('#content').html(result)
			$('#loading').removeClass("active");

		}
	});
}
// Função inserir
function salvarPessoa() {
	// $('#loading').addClass("active");
	let data = {
		nome: $('#nome').val(),
		tipo_sanguineo: $('#sangue').val(),
		signo: $('#signo').val()
	}

	$.ajax({
		url: 'pessoas/insert',
		type: 'POST',
		data: data,
		success: function(result) {
			// Do something with the result
			$('#content').html(result)
			$('#loading').removeClass("active");

		},
		error: function(result) {
			// Do something with the result
			$('#content').html(result)
			$('#loading').removeClass("active");

		}
	});
}