$(function(){
    $('main .et_null').on('blur',function(){
        // console.log($(this))
        var val = $(this).val();
        if(val === ''){
            $(this).next('p').show();
        }else{
            $(this).next('p').hide();
        }
    })
    $('#et_getCode').on('click',function(){
        var tel = $('#et_tel').val();
        var num = $('#et_num').val();
        if(!(/^1[34578]\d{9}$/.test(tel))){
            alert('手机号码输入有误');
        }else if(num != 6517){
            alert('验证码错误');
        }else{
            $(this).prop('disabled',true);
            $('#et_ifCode').html('验证码已经发送').show();
            var tip = 60;
            $(this).val('在'+tip+'秒后重新发送');
            var that = $(this);
            var timer = setInterval(function(){
                tip--;
                that.val('在'+tip+'秒后重新发送');
                if(tip === 0){
                    clearInterval(timer);
                    that.val('重新发送验证码');
                    that.prop('disabled', false);
                }
            },1000)

        }
    })
    $('#et_phone').on('blur',function(){
        var val = $(this).val();
        if(val != 1234){
            $('#et_ifCode').html('验证失败').css('color', 'red');
        }else{
            $('#et_ifCode').html('验证成功').css('color', 'green');
        }
    })
    $("#fixed_close").on('click', function(){
        $(this).parent().parent().fadeOut(500);
    })
})