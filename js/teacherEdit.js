/**
 * Created by daijing on 2017/10/19.
 */
define(["jquery",
        "text!tpls/teacherEdit.html",
        "art"
],function($,teacherEdit,art){
    return function(id){
        //ajax�������ݣ�
        $.ajax({
            url:"/api/teacher/edit",
            type:"get",
            data:{tc_id:id},
            success:function(res){
                if(res.code != 200) throw new Error(res.msg);
                var editData = art.render(teacherEdit,res.result);
                var $editData = $(editData)
                    //ajax�ύ���е�����, ������Ҫ�ύ�����ݵı�����name���ԣ���ȡ���ݰ�Ҫ���ύ
                    //��ֹĬ���¼��ķ����������¼�ί�С�
                    .on("submit","form",function(e){
                        e.preventDefault();
                        //��ȡ����
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

                    //ģ̬������
                    .on("hidden.bs.modal",function(){
                    $(this).remove();
                }).appendTo("body").modal();
            }
        })
    }
})