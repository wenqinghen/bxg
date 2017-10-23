/**
 * Created by daijing on 2017/10/19.
 */
define(["jquery",
        "text!tpls/teacherEdit.html",
        "art"
],function($,teacherEdit,art){
    return function(id){
        //ajax请求数据，
        $.ajax({
            url:"/api/teacher/edit",
            type:"get",
            data:{tc_id:id},
            success:function(res){
                if(res.code != 200) throw new Error(res.msg);
                var editData = art.render(teacherEdit,res.result);
                var $editData = $(editData)
                    //ajax提交表单中的数据, 给整个要提交的数据的表单设置name属性，获取数据按要求提交
                    //阻止默认事件的发生，运用事件委托。
                    .on("submit","form",function(e){
                        e.preventDefault();
                        //获取数据
                        var teacherEditData = $(this).serialize();
                        console.log(teacherEditData);
                        $.ajax({
                            url:"/api/teacher/update",
                            type:"post",
                            data:teacherEditData,
                            success:function(res){
                                //console.log(res);
                                $editData.modal("hide");
                                $(".list-group a[v=teacher]").trigger("click");
                            }
                        })
                    })

                    //模态框隐藏
                    .on("hidden.bs.modal",function(){
                    $(this).remove();
                }).appendTo("body").modal();
            }
        })
    }
})