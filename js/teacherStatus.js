/**
 * Created by daijing on 2017/10/19.
 */
//需要使用到jquery
define(["jquery"],function($){
    return function(data,render){
        //使用ajax发送并请求数据
        $.ajax({
            url:"/api/teacher/handle",
            type:"post",
            data:data,
            success:function(res){
                //console.log(res);
                render(res.result.tc_status);
            }
        })
    }
})