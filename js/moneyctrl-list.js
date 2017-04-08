$(function(){
    // console.log(GetQueryString('pageid'));
    var pageid = GetQueryString('pageid');
    var productId = GetQueryString('productId');
    $.ajax({
        url: "http://mmb.ittun.com/api/getmoneyctrl?pageid="+pageid,
        dataType: "json",
        success: function (data) {
            var o = {};
            for(var i = 0; i < data.result.length; i++){
                if(data.result[i].productId == productId){
                    o = data.result[i];
                    break;
                }
            }
            console.log(o)
            var title = o.productName;
            $('title').html(title);
            var html = template('tem_mlist', o);
            $('main').html(html);
        }
    });
})

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}