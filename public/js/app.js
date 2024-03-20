(function ($) {
    "use strict";

    $(document).on("click",".menu .menu-item", function() {

        var key = $(this).attr('tag')
        
        // switch (key) {
        //     case 'warehouse':
                
        //         break;
        
        //     default:
        //         break;
        // }

        switch (key) {
            case "warehouse":
                
                break;
        
            default:
                break;
        }

        loadFile.load("warehouse", (data)=>{
            console.log(data);
        })
    })

})(jQuery);