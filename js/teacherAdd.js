/**
 * Created by daijing on 2017/10/18.
 */
define(["jquery","text!tpls/teacherAdd.html"],function($,teacherAdd){
    return function(){

        var $html = $(teacherAdd);
        $html.on("hidden.bs.modal",function(){
            $(this).remove();
        }).on("submit","form",function(e){


            //组织默认事件；ajax发送数据
            e.preventDefault();

            var addData = $("form").serialize();
            //console.log(addData);
            $.ajax({
                url:"/api/teacher/add",
                type:"post",
                data:addData,
                success:function(res){
                    //console.log(res.code);
                    if(res.code!=200) return console.log(res.msg);


                    $html.modal("hide");
                    $(".list-group a[v=teacher]").trigger('click');
                }
            })
        }).appendTo("body").modal()
    }
})