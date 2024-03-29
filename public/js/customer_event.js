$(function() {
    // Inputmask currency
    // $("#modalImportItems .currency-input").inputmask({ alias : "vnd" });

    $(document).on("click","#customer-form #addNewCustomer", function() {
        var customer_name = $("#customer-form #customer_name").val()
        var phone_number = $("#customer-form #phone_number").val()
        var address = $("#customer-form #address").val()

        if(!customer_name|| !phone_number|| !address){
          return
        }

        var customer_name_latin = convertToBasicLatin(customer_name)

        params = {
          act : API_ACTION.ADD_CUSTOMER,
          customer_name: customer_name,
          phone_number: phone_number,
          address: address,
          customer_name_latin: customer_name_latin
        }

        apiHandler.post(params, (data)=>{
          if(data.success){
            $("#customer-form #customer_name").val("")
            $("#customer-form #phone_number").val("")
            $("#customer-form #address").val("")
    
            showModalSuccess("Thêm khách hàng thành công")
            loadCustomerList()
          }else{
            showModalError()
          }
        })

    })

  })