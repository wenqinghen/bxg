/**
 * Created by daijing on 2017/10/21.
 */
//�����б������
define([
    "jquery",
    "text!tpls/sortTpl.html",
    "art",
    "sortAdd",
    "sortEdit"
],function($,sortTpls,art,sortAdd,sortEdit){
    return function(){
        //ajax�����������
        $.ajax({
            url:"/api/category",
            type:"get",
            success:function(res){
                if(res.code != 200) throw new Error(res.msg);
                //����ɹ���ȡ���ݲ����뵽ģ����ȥ��
                var result = art.render(sortTpls,res);
                //������Ľ��׷�ӵ�main��ȥ
                $(".main").html(result);
                //console.log(res);

                
                //��ӷ���
                $(".panel").on("click",".btn-add",function(){
                    sortAdd();
                })


                //�༭��ʦ
                $(".panel").on("click",".btn-edit",function(){
                    var id = $(this).parent().attr("cg_id");
                    sortEdit(id);
                })
            }
        })
    }
})