/*
* @Author: lcj
* @Date:   2017-03-30 16:22:09
* @Last Modified by:   lcj
* @Last Modified time: 2017-03-30 21:42:42
*/

$(function () {
  //品牌大全数据获取
  $.ajax({
    // url: 'http://mmb.ittun.com/api/getbrandtitle',
    url:'http://139.199.157.195:9090/api/getbrandtitle',
    type: 'get',
    dataType: 'json',
    success:function (data) {
      // console.log(data);
      var html=template('brandTep',data);
      $('.hot_brand .con').html(html);
        // 保存点击数据
       $('.hot_brand a').each(function(index, el) {
          $(el).on('click',function() {
              // event.preventDefault();
              // 获取标题对应到第张长页面
              $brandType=$(el).html();
              $brandType=$brandType.slice(-$brandType.length,-4);

            window.localStorage.setItem('brandType',$brandType)
            });
         });
    }
  })

  
  

  
})