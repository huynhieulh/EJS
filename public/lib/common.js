function convertToBasicLatin(text) {
    // Use the mapping to replace special characters with basic Latin equivalents
    return text.replace(/[^\x00-\x7F]/g, function(character) {
        return SPECIALCHARSMAP[character] || character;
    });
}


function showModalError(message){
    var messageEl = $("#errorModal").find(".message");
    if(!message){
        messageEl.text("Thao tác thất bại");
    }else{
        messageEl.text(message);
    }
    var errModal = new bootstrap.Modal(document.getElementById('errorModal'))
    errModal.show()
    delete errModal
}

function showModalSuccess(message){
    var messageEl = $("#successModal").find(".message");
    if(!message){
        messageEl.text("Thao tác thành công");
    }else{
        messageEl.text(message);
    }
    var successModal = new bootstrap.Modal(document.getElementById('successModal'))
    successModal.show()
    delete successModal
}