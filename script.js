$(document).ready(function() {
    console.log('Javascript (JQuery) carregado.');

    loadList();

    $('#add_button').click( addItem );

    //ESTE SÓ FUNCIONA PARA ITENS QUE NÃO FORAM ADICIONADOS DINCAMICAMENTE
    /*
    $("#todo_list li").dblclick(function(){
        console.log('Double click. ' );
        $(this).toggleClass("completed");

    });
    */

    $(document).on("dblclick", "#todo_list li", function() {
        $(this).toggleClass("completed");
    });

    $(document).on("click", "#todo_list li a.remove" , function() {
        $(this).parent().remove();
    });

    //
    $(document).keypress(function(e){
        if (e.which == 13 && $('#add_text').is(':focus')){
            $("#add_button").click();
        }
    });

    $("#clr_done_button").click(function(){
        console.log('Clear completed button. ');
        if (confirm("Tem certeza que deseja remover os itens feitos?")) {
            $('#todo_list li.completed').remove();
            console.log('Completed were removed. ');
        }
    });

    $('#empty_button').click( function(){
        console.log('Empty list button. ');
        if (confirm("Tem certeza que deseja limpar a lista?")) {
            $('#todo_list li').remove();
            console.log('The list is empty');
        };
    });

    $('#save_button').click( function(){
        console.log('Save button. ');

        var toDos = [];

        $('#todo_list li').each( function() {

            var toDoInfo = {
                "task" : $(this).text().slice(0,-2),
                "completed" : $(this).hasClass("completed")
            };
            toDos.push(toDoInfo);

        });

        localStorage.setItem("toDos", JSON.stringify(toDos));

        alert('A lista atual foi salva.')

    });

    function loadList() {
        if (localStorage.getItem("toDos") != null) {
            var toDos = JSON.parse(localStorage.getItem("toDos"));
    
            for (var i = 0; i < toDos.length; i++) {
                var toDo = toDos[i];
                addItem(toDo.task, toDo.completed, 'load');
            }
        }
    }
      
    function addItem(text, completed, mode = 'create'){
        console.log('Add item. Mode: ' + mode);

        if (mode=='create'){
            text = $('#add_text').val();
            completed = false;
        }

        if (text != ''){

            var newItem = $("<li></li>").html( text + " <a href='javascript:void(0);' class='remove'>&times;</a>" );
            if (completed){
                newItem.addClass("completed");
            }

            $('#todo_list').append( newItem );
            $('#add_text').val('')

        }

        console.log('Adicionado!')
    }

});
