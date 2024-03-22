(function ($) {
    "use strict";

    Inputmask.extendAliases({
        vnd: {
            suffix: " đ", 
            groupSeparator: ".",
            alias: "numeric",
            placeholder: "0",
            autoGroup: true,
            digits: 0,
            digitsOptional: true,
            clearMaskOnLostFocus: false
        }
    });

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
        // Auto close menu tab if mobile
        if (Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1){
            $(".sidebar-toggler").trigger("click")
        }
    })

})(jQuery);