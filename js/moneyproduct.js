/*
* @Author: lcj
* @Date:   2017-03-30 13:28:21
* @Last Modified by:   lcj
* @Last Modified time: 2017-03-30 15:34:57
*/


$(function () {
 var productId=GetQueryString('productId');
 console.log(productId);
  $.ajax({
    // url: 'http://mmb.ittun.com/api/getmoneyctrlproduct',
    url:'http://139.199.157.195:9090/api/getmoneyctrlproduct',
    type: 'get',
    dataType: 'json',
    data: {'productid':productId},
    success:function(data){
      var html = template('shopTem', data);
      $('.container').html(html);
    }
  })
  
  
})