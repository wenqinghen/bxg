/**
 * Created by daijing on 2017/10/22.
 */
define(["jquery","text!tpls/sortEditTpl.html","art"],function($,sortEditTpl,art){
    return function(id){


        //ajax请求获取数据编译模板
        $.ajax({
            url:"/api/category/edit",
            type:"get",
            data:{cg_id:id},
            success:function(res){

                res.result.top.unshift({"cg_id":0,"cg_name":"顶级分类"})
                //编译模板
                var sortEdit = art.render(sortEditTpl,res.result);
                var $sortEdit = $(sortEdit)
                    .on("submit","form",function(e){
                        //阻止默认事件
                        e.preventDefault();
                        //设置name属性，使用$("form").serilize()
                        var data = $("form").serialize();
                        $.ajax({
                            url:"/api/category/modify",
                            type:"post",
                            data:data,
                            success:function(res){
                                if(res.code != 200) throw new Error(res.msg);
                                $sortEdit.modal("hide");
                                $(".sort").trigger("click");
                            }
                        })
                    })
                    .modal();
            }
        })
    }
})