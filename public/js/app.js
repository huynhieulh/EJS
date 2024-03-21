(function ($) {
    "use strict";

    $(document).on("click",".menu .menu-item", function() {
        $(".menu .menu-item.active").removeClass("active")
        $(this).addClass("active")

        var key = $(this).attr('tag')
        // Load html into page
        if($("#" + key).is(':empty')){
            loadFile.load(key, (data)=>{
                $("#" + key).append(data)
            })
        }

        // Show container
        $(".content .content-tab.active").removeClass("active")
        $("#" + key).addClass("active");
    })

})(jQuery);