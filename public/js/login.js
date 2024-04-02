(function ($) {
    $(document).on("click","#login",function() {
        username = $("#username").val()
        password = $("#password").val()

        if (!username || !password){
            return 
        }

        const params = {
            act: API_ACTION.LOGIN,
            username: $("#username").val(),
            password: $("#password").val()
        }
        apiHandler.post(params, (data)=>{
            if (data.success === true){
                console.log("Set data:", data);
                $.cookie("user_data", JSON.stringify(data.data));
                document.location.href = '/'
            }else{
                $("#validationFeedback").addClass("d-block");
            }
        })
    });

    $(document).on("input","#username", "#password", function() {
        if ($("#validationFeedback").hasClass("d-block")){
            $("#validationFeedback").removeClass("d-block");
        }
    })

})(jQuery);