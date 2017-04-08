$(function(){
    $.ajax({
        url: "http://mmb.ittun.com/api/getinlanddiscount",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            var time, month, day, hour, minute, total, arr=[];
            for(var i = 0; i < data.result.length; i++){
                time = data.result[i].productTime;
                // console.log(time);
                month = parseInt(time.slice(0,2));
                day = parseInt(time.slice(3,5));
                hour = parseInt(time.slice(6,8));
                minute = parseInt(time.slice(9,11));
                total = minute + hour * 60 + day * 24 * 60;
                data.result[i]['productTotal'] = total;
                data.result[i]['productMonth'] = month;
            }
            // console.log(data);
            for (var i = 0; i < data.result.length - 1; i++) {
               var flag = true;//假设排好了
                                    //4
                for (var j = 0; j < data.result.length - 1 - i; j++) {
                    if(data.result[j].productMonth < data.result[j+1].productMonth){
                        var temp = data.result[j];
                        data.result[j] = data.result[j + 1];
                        data.result[j + 1] = temp;
                        flag = false;
                        continue;
                    }else{
                        if(data.result[j].productTotal < data.result[j+1].productTotal){
                            var temp = data.result[j];
                            data.result[j] = data.result[j + 1];
                            data.result[j + 1] = temp;
                            flag = false;
                        }
                    }
                }
                if (flag) {
                    break;
                }
            }
            // console.log('time:'+time+'-- month:'+month+'--day:'+day+'--hour:'+hour+'--minute:'+minute)
            var html = template('tem_inland', data);
            $('#inland_main').html(html);
        }
    });
})