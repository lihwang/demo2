/*
* @Author: lcj
* @Date:   2017-03-30 13:28:21
* @Last Modified by:   lcj
* @Last Modified time: 2017-03-30 15:34:57
*/


$(function () {
  $.ajax({
    url: 'http://139.199.157.195:9090/api/getcoupon',
    type: 'get',
    dataType: 'json',
    success:function(data){
      var html = template('couponTep', data);
      $('#coupon').html(html);
    }
  })
  
  
})