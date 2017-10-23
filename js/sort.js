/**
 * Created by daijing on 2017/10/21.
 */
//分类列表的内容
define([
    "jquery",
    "text!tpls/sortTpl.html",
    "art",
    "sortAdd",
    "sortEdit"
],function($,sortTpls,art,sortAdd,sortEdit){
    return function(){
        //ajax请求分类数据
        $.ajax({
            url:"/api/category",
            type:"get",
            success:function(res){
                if(res.code != 200) throw new Error(res.msg);
                //请求成功获取数据并编译到模板中去。
                var result = art.render(sortTpls,res);
                //将编译的结果追加到main中去
                $(".main").html(result);
                //console.log(res);

                
                //添加分类
                $(".panel").on("click",".btn-add",function(){
                    sortAdd();
                })


                //编辑讲师
                $(".panel").on("click",".btn-edit",function(){
                    var id = $(this).parent().attr("cg_id");
                    sortEdit(id);
                })
            }
        })
    }
})