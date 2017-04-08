  $(function () {  

    // 跳转到首页
    $('.back_top').on('click', function(e) {
        e.preventDefault();
        scrollTo(0, 0);
    })

   //请求数据封装
    function requreData(pageid,fn) {
        $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getmoneyctrl",
        dataType: "json",
        data:{pageid,pageid},
        success: function(data) {
            var html = template('promotionTep', data);
            $('.container .promotion').html(html);
            fn(data);
        }
    });
    }

   //请求页面初始值
     var pageid=1;
    //  商品页数动态加载总页数
     var Pagenum=null;
        // 促销商品的加载
         requreData(pageid,function(data){
            //获取总页数
             Pagenum=Math.ceil((data.totalCount+0)/10);
            //拼接页面页数数据
            var sel='';
            for(var i=1;i<=Pagenum;i++){
            sel+='<option>'+i+'/'+Pagenum+'</option>';
             }
          $('#selectPage').html(sel);
       }) 
      
    // 页面选择的操作
    $("#selectPage").change(function(){
        //获取选项下标值
         pageid=$(this).get(0).selectedIndex+1;
        //  加载数据
         requreData(pageid,function(){});
    });
    

    //上下页选择
    $('.pageDown').on('click',function (e) {
        // 阻止a的默认行为
        e.preventDefault();  
        //  页面+1
         pageid=pageid+1;
        //  判断是否到底
        if(pageid<=Pagenum){
            // 不到底的话请求ajax数据
           requreData(pageid,function(){
            $('#selectPage').find('option:eq('+(pageid-1)+')').prop('selected',true);
             });
            //  到底提示
        }else{
            alert('到最后一页了');
        }
    })
    $('.pageUp').on('click',function (e) {
            e.preventDefault();  
            if(pageid>1){
            pageid=pageid-1;
            requreData(pageid,function(){
                $('#selectPage').find('option:eq('+(pageid-1)+')').prop('selected',true);
            });
            }else{
                alert('已经是第一页了');
            }
        })

  })