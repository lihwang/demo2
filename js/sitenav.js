
// 商场数据请求
$(function(){
    $.ajax({
    url:'http://139.199.157.195:9090/api/getsitenav',
    dataType:'json',
    type:'get',
    success:function(data){
        // console.log(data)
        var html=template('marketNavTep',data);
        $('.marketNav .nav').html(html);
    }
   })
})