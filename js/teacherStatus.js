/**
 * Created by daijing on 2017/10/19.
 */
//��Ҫʹ�õ�jquery
define(["jquery"],function($){
    return function(data,render){
        //ʹ��ajax���Ͳ���������
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