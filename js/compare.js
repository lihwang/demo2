
$.ajax({
    dataType:'json',
    type:'get',
    url:'http://139.199.157.195:9090/api/getcategorytitle',
    success:function(data){
        var tem=template('bigTmp',data);
        $('.big-category').html(tem);
        $('.odd').click(function(){
            $(this).next('.even').toggleClass('on');
            if($(this).next('.even').hasClass('on')){
                // alert(123);
                $(this).children('i').css('background','url(images/arrow-up.png) no-repeat center/18px 18px')
            }else{
                $(this).children('i').css('background','url(images/arrow-down.png) no-repeat center/26px 26px')
            }
            var titleid=$(this).attr("titleId");
            var that=this;
             $.ajax({
                dataType:'json',
                type:'get',
                data:{titleid:titleid},
                url:'http://139.199.157.195:9090/api/getcategory',
                success:function(data){
                    var result=data.result;
                    var html='';
                    var long=Math.ceil(result.length/3); 
                    var k=0;               
                    for(var i=0;i<long;i++){
                        html+='<tr>';
                        for(var j=0;j<3;j++){                                                      
                            if(k==result.length && k<3*long){
                                html+='<td><a href="#"></a></td>';
                            }else if(k==3*long){
                                break;
                            } else{
                                html+='<td><a href="productList.html?categoryid='+result[k].categoryId+'">'+result[k].category+'</a></td>';
                                k++;
                            }       
                        }
                        html+='</tr>';
                    }
                    $('.odd').each(function(i,v){
                        if($(v).attr('titleId')==titleid){
                            $(v).next('.even').find('tbody').html(html);
                        }
                    })
                }
            })
        })  
     
    }
})