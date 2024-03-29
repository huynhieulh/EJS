$(function() {
    // Inputmask currency
    $("#modalImportItems .currency-input").inputmask({ alias : "vnd" });

    // Date picker production date
    $('#dateProductionPicker').datetimepicker({ 
      locale: "vi", 
      format: 'YYYY-MM-DD'
    });
    
    // Date picker expiry date
    $('#dateExpiryPicker').datetimepicker({ 
      locale: "vi", 
      format: 'YYYY-MM-DD'
    });

    $(document).on("click","#modalImportItems #addNewItem", function() {
        var product_name = $("#modalImportItems #product_name").val()
        var description = $("#modalImportItems #description").val()
        var price = $("#modalImportItems #price").val().replaceAll(",","").replaceAll("đ","");
        var production_date = $("#modalImportItems #production_date").val()
        var expiration_date = $("#modalImportItems #expiration_date").val()
        var quantity_available = $("#modalImportItems #quantity_available").val()
        
        if(!product_name|| !expiration_date|| !production_date){
          return
        }

        product_name_latin = convertToBasicLatin(product_name)
        params = {
          act : API_ACTION.ADD_PRODUCT,
          product_name: product_name,
          description: description,
          price: price,
          production_date: production_date,
          expiration_date: expiration_date,
          quantity_available: quantity_available,
          product_name_latin: product_name_latin
        }

        apiHandler.post(params, (data)=>{
          if(data.success){
            $("#modalImportItems #product_name").val("")
            $("#modalImportItems #description").val("")
            $("#modalImportItems #price").val("")
            $("#modalImportItems #production_date").val("")
            $("#modalImportItems #expiration_date").val("")
            $("#modalImportItems #quantity_available").val("0")
            showModalSuccess()
            loadProductList()
          }else{
            showModalError()
          }
        })

    })

  })