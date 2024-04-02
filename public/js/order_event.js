var order_data = {
    customer_id: "",
    user_id: "",
    order_date: "",
    order_status: "",
    items:[
        {
            product_id: "",
            quantity: "",
            unit_price: ""
        }
    ]
}

var product_data = null

$(function() {

    document
    .querySelectorAll(".select")
    .forEach((el) => new bootstrap5.Select(el));

    $(document).on("click","#order #addOrderBtn", function() {
        binding_product_order()
    })

    // Listen product change - xóa bỏ option - Sản phẩm đã thêm vào thì ko cho thêm nữa
    $(document).on("change","#modalOrder #product_name #product_name_select", function() {
        console.log($(this).val());
    })

    // Listen total item change
    $(document).on("change","#modalOrder #total-item", function() {
        console.log($(this).val());
    })


})


function binding_product_order(){
    var modal_order = $("#modalOrder")
    // Binding order list
    apiHandler.get({act : API_ACTION.GET_PRODUCT}, (res)=>{
        if(res.success){
            var product_select = modal_order.find("#product_name").find("select[name='product_name']");
            product_select.empty();
            array = res.data
            console.log(array);
            product_select.append("<option value='null'></option>");

            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (parseInt(element.quantity_available) > 0){
                    product_select.append(
                        "<option value="+ element.product_id +" available="+ element.quantity_available +">"+ element.product_name +"</option>"
                        );
                }
            }
        }
    })
    // Binding user list
    apiHandler.get({act : API_ACTION.GET_CUSTOMER}, (res)=>{
        if(res.success){
            var customer_select = modal_order.find("#customer_id").find("select[name='customer_id']");
            customer_select.empty();
            array = res.data
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                customer_select.append("<option value="+ element.customer_id +">"+ element.customer_name +"</option>");
            }
        }
    })
    // Binding user list
    apiHandler.get({act : API_ACTION.GET_USERS}, (res)=>{
        if(res.success){
            var user_select = modal_order.find("#user_id").find("select[name='user_id']");
            user_select.empty();
            clear_select_input(user_select)
            array = res.data
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                user_select.append("<option value="+ element.user_id +">"+ element.full_name +"</option>");
            }
            var user = JSON.parse($.cookie("user_data")); 
            user_select.val(String(user.user_id));
            innderData = '<span class="option" data-label="' + String(user.full_name) +'" data-value="' + String(user.user_id)+ '">' + String(user.full_name) + '</span>'
            modal_order.find("#user_id.select").prepend(innderData)
        }
    })
}

function clear_select_input(selectEl){
    var parent = selectEl.parent()
    parent.find(".option").remove();
    selectEl.val("")
}