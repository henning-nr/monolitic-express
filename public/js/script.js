function editar(id){
    $('#loading2').addClass("active");
    $('#id').val('');					
$('#nome').val('');			
$('#sangue').val('');			
$('#signo').val('');		

                                    $.ajax({
url: 'pessoas/edit/'+id,
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
// Função deletar
function deletar(id){
    $('#loading').addClass("active");
    $.ajax({
url: 'pessoas/delete/'+id,
type: 'DELETE',
success: function(result) {
// Do something with the result
$('#content').html(result)
$('#loading').removeClass("active");

}
});
}

                                // Função deletar
function editarPessoa(){
    $('#loading').addClass("active");
        let id = $('#id').val()						
    let data = {
        nome: $('#nome').val(),
        tipo_sanguineo: $('#sangue').val(),			
        signo: $('#signo').val()
    }

$.ajax({
url: 'pessoas/update/'+id,
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