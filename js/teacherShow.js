/**
 * Created by daijing on 2017/10/18.
 */
define(["jquery","text!tpls/teacherShow.html","art"],function($,teacherShow,art){
    return function(tc_id){
        $.ajax({
            url:"/api/teacher/view",
            type:"get",
            data:{tc_id:tc_id},
            success:function(res){
                if(res.code != 200) return console.log(res.msg);

                console.log(res.result);
                var html = art.render(teacherShow,res.result);
                //console.log(html);
                $(html).on("hide.bs.modal",function(){
                    $(this).remove();
                }).appendTo('body').modal();
            }
        })
    }
})