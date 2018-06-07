$(document).ready(function () {
    $(".delete-btn").click(function (event) {
        event.preventDefault();
        var id = $(this).attr("data");
        $.ajax(`/remove/${id}`, {
            type: "PUT"
        }).then(function(){
            location.reload();
        })
    });
    
    $(".note-btn").click(function (event) {
        event.preventDefault();
        var id = $(this).attr("data");
        $('#article-id').text(id);
        $('#save-note').attr('data', id);
        $.ajax(`/articles/${id}`, {
            type: "GET"
        }).then(function (data) {
            console.log(data)
            $('.articles-available').empty();
            if (data[0].note.length > 0){
                data[0].note.forEach(v => {
                    $('.articles-available').append($(`<li class='list-group-item'>${v.text}<button type='button' class='btn btn-danger btn-sm float-right btn-deletenote' data='${v._id}'>X</button></li>`));
                })
            }
            else {
                $('.articles-available').append($(`<li class='list-group-item'>No notes for this article yet</li>`));
                console.log("Second ran!")
            }
        })
        $('#note-modal').modal('toggle');
    });

    $(document).on('click', '.btn-deletenote', function (){
            event.preventDefault();
            console.log($(this).attr("data"))
            var id = $(this).attr("data");
            console.log(id);
            $.ajax(`/note/${id}`, {
                type: "DELETE"
            }).then(function () {
                $('#note-modal').modal('toggle');
            });
    });

    $("#save-note").click(function (event) {
        event.preventDefault();
        var id = $(this).attr('data');
        var noteText = $('#note-input').val().trim();
        $('#note-input').val('');
        $.ajax('/note/' + id, {
            type: "POST",
            data: { text: noteText}
        }).then(function (data) {
            console.log(data)
        })
        $('#note-modal').modal('toggle');
    });

    // global variables so I can separate the save-btn and new-note buttons
    // save-btn loads the modal and collects the id of the button. 
    // new-note gets the note field and does the ajax call

    var button;
    var id;
    var note;

    $(".save-btn").click(function (event) {
        button = $(this);
        id = button.attr("id");
        $('#save-article-modal').modal('toggle');
    });

    $("#new-note").click(function(event) {
        event.preventDefault();
        note = $('#note-input').val().trim();
        // var button = $(this);
        // var id = button.attr("id");
        $('#save-article-modal').modal('toggle');
        $.ajax('/save/' + id, {
            type: "PUT",
            // type: "POST",
            // dataType: "json",
            // note: note
        }).then(function() {
            // var alert = `
            // <div class="alert alert-warning alert-dismissible fade show mt-3" role="alert">
            // Your note has been saved!
            // <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            //     <span aria-hidden="true">&times;</span>
            // </button>
            // </div>`
            // button.parent().append(alert);
            }
        );
        console.log(note);
        note = '';
    });
});