$(function(){
    $.ajax({
        type: "get",
        url: "http://mmb.ittun.com/api/getinlanddiscount",
        // data: 'productId',
        dataType: "json",
        success: function (data) {
            var productId = GetQueryString('productId');
            // console.log(productId);
            var json ;
            for(var i = 0; i < data.result.length; i++){
                if(data.result[i].productId == productId){
                    json = data.result[i];
                    break;
                }
            }
            var html = template('tem_in_links',json);
            $('main').html(html);
        }
    });
    
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
})