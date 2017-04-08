var pageNum=1;//设置一个全局变量，来接受当前页面的页数
var seLength;//设一个全局变量，用来接受当前产品总共需要几页

//封装一个ajax函数，方便之后用来申请ajax数据
function ajax(categoryid,pageid){
    $.ajax({
    dataType:'json',
    data:{categoryid:categoryid,pageid:pageid},
    type:'get',
    url:'http://139.199.157.195:9090/api/getproductlist',
    success:function(data){
        console.log(data);
        var tem=template('productTmp',data);//模板
        $('.product>ul').html(tem);
        seLength=Math.ceil(data.totalCount/data.pagesize);//计算每种产品需要的页数
        var html='';
        for(var i=1;i<seLength+1;i++){
            html+='<option value='+i+'>'+i+'/'+seLength+'</option>';//有几页就创建几个option
        }
        $('.sel-page select').html(html);//将option加入select中
        //遍历option，看看哪个option的value值等于之前点击的那个option，则点击后这个option就被选中
        $('.sel-page select option').each(function(i,v){
            if($(v).val()==pageNum){
                $(this).prop('selected',true);
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

var categoryid=getQueryString('categoryid');
ajax(categoryid,pageNum);

//点击上一页
   $('.pre-page>div').click(function(){
            if(pageNum==1){
                alert('这已经是第一页了');
            }else{
                pageNum--;
                ajax(categoryid,pageNum);
                // document.body.scrollTop=0;
            }
        })
    //点击下一页
    $('.next-page>div').click(function(){
            if(pageNum==seLength){
                alert('这已经是最后一页了');
            }else{
                pageNum++;
                ajax(categoryid,pageNum);
            }
        })
    //通过select选择想看的页数
    $('.sel-page>select').change(function(){
        pageNum=$(this).val();
        ajax(categoryid,pageNum);
    })




