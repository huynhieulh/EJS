
function loadProductList(){
    apiHandler.get({act : API_ACTION.GET_PRODUCT}, (res)=>{
        if(res.success){

            data = res.data
            productLenght = data.length
            tableBody = $("#warehouse").find(".table").find("tbody")
            tableBody.empty()

            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND' // Vietnamese Dong
            });

            for (let i = 0; i < productLenght; i++) {
                price = parseFloat(data[i].price).toFixed()
                price = formatter.format(price).replaceAll(".", ",");
                content = `<tr id="` + data[i].product_id + `">
                                <td scope="row">` + (i + 1) +`</th>
                                <td>` + data[i].product_name + `</td>
                                <td>` + data[i].quantity_available + `</td>
                                <td>` + price + `</td>
                                <td>` + data[i].exp_date + `</td>
                                <td class="d-flex justify-content-center">
                                    <button class="btn"><i class="fas fa-pen-square"></i></button>
                                </td>
                            </tr>`;

                tableBody.append(content);
            }
        }
    })
}
function loadCustomerList(){
    apiHandler.get({act : API_ACTION.GET_CUSTOMER}, (res)=>{
        if(res.success){

            data = res.data
            customertLenght = data.length
            tableBody = $("#table-customer-list").find("tbody")
            tableBody.empty()

            for (let i = 0; i < customertLenght; i++) {
                content = `<tr id="` + data[i].customer_id + `">
                                <td scope="row">` + (i + 1) +`</th>
                                <td>` + data[i].customer_name + `</td>
                                <td>` + data[i].address + `</td>
                                <td>` + data[i].phone_number + `</td>
                                <td class="d-flex justify-content-center">
                                    <button class="btn"><i class="fas fa-pen-square"></i></button>
                                </td>
                            </tr>`;

                tableBody.append(content);
            }
        }
    })
}

function bindingData(key) {
    switch (key) {
        case "warehouse":          
            loadProductList()
            break;
        case "customer":
            loadCustomerList()
        default:
            break;
    }
} 

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
                bindingData(key)
            })
        }else{
            bindingData(key)
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