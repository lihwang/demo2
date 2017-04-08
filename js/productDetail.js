//封装一个ajax函数，传入2个参数，一个是要拿到页面的详细信息和评论的productid，另一个则是面包屑导航需要的categoryid
function ajax(productid,categoryid){
    $.ajax({
        url:'http://139.199.157.195:9090/api/getproduct',//用来拿到产品详细信息的地址
        data:{productid:productid},
        dataType:'json',
        type:'get',
        success:function(data){
            var tem1=template('detailTmp',data);//从产品图片到产品评论之上的html模板
            $('.pro-introduce').html(tem1);

            console.log(data);
            var result=data.result;
            var proCode=result[0].productName.split(' ')[0];//拿到产品productName字符串的第一个空白之前的内容
            $.ajax({
                 url:'http://139.199.157.195:9090/api/getcategorybyid',//拿到category的url地址
                 data:{categoryid:categoryid},
                 dataType:'json',
                 type:'get',
                 success:function(data){
                     var result=data.result;
                     var proType=result[0].category;
                     console.log(result);
                     //拼接面包屑的字符串
                     var html='<a href="index.html">首页</a> > <a href="productList.html?categoryid='+categoryid+'&pageid=1">'+proType+'</a> > <a href="#">'+proCode+'</a> > ';
                     $('.bread').html(html); 
                 }
            })

            //产品评论的ajax获取部分
            $.ajax({
                url:'http://139.199.157.195:9090/api/getproductcom',
                data:{productid:productid},
                dataType:'json',
                type:'get',
                success:function(data){
                    var tem2=template('commentTmp',data);
                    $('.comment-content').html(tem2);
                }
            })
        }
    })
}
//获取从url传过来的值
function getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]);  
        return null;  
    } 

var productid=getQueryString('productid');
var categoryid=getQueryString('categoryid');
ajax(productid,categoryid);
