$(document).ready(function () {
        doSearch(1);
    });
    $(document).on("click", ".keys", function () {
        //获取当前被点击的值 及需要排序的字段
        var orderCode=$(this).attr("value");
        if(orderCode=='HS_NAME_CN'){
            return;
        }
        if(orderCode=='COUNTRY_NAME_CN'){
            return;
        }
        if(orderCode=='TRADE_MODE_CN'){
            return;
        }
        if(orderCode=='TRADE_CO_PORT_CN'){
            return;
        }
        if(orderCode=='CUSTOMS_NAME_CN'){
            return;
        }
        if(orderCode=='TRAF_NAME_CN'){
            return;
        }
        //获取orderType 的值
        var orderType = $("#orderType").val();
        //首先判断是不是点击的同一个
        if(orderType.indexOf(orderCode)!=-1){ //点击的同一个
            if(orderType.indexOf("ASC")!=-1){
                $("#orderType").val(orderCode+" DESC");
            }else{
                $("#orderType").val(orderCode+" ASC");
            }
        }else{
            $("#orderType").val(orderCode+" ASC");
        }
        doSearch(1);
    })
    function downLoad() {
        var totalSize=$("#totalSize").val();
        if(totalSize==null){
            layer.alert("访问超时，数据无法导出");
            return;
        }
        if(totalSize==0){
            layer.alert("未查询到数据，无法导出");
            return;
        }
        var serialize = $("#Search_form").serialize();
        layer.confirm("确认导出？", {title: '提示'}, function () {
            layer.closeAll('dialog');
            /*window.location.href = "/queryData/downloadQueryData?"+serialize;*/
            var param={
                "pageSize":$("#hidPageSize").val(),
                "iEType":$("#iEType").val(),
                "currencyType":$("#currencyType").val(),
                "year":$("#year").val(),
                "startMonth":$("#startMonth").val(),
                "endMonth":$("#endMonth").val(),
                "monthFlag":$("#monthFlag").val(),
                "unitFlag":$("#unitFlag").val(),
                "codeLength":$("#codeLength").val(),
                "outerField1":$("#outerField1").val(),
                "outerField2":$("#outerField2").val(),
                "outerField3":$("#outerField3").val(),
                "outerField4":$("#outerField4").val(),
                "outerValue1":$("#outerValue1").val(),
                "outerValue2":$("#outerValue2").val(),
                "outerValue3":$("#outerValue3").val(),
                "outerValue4":$("#outerValue4").val(),
                "orderType":$("#orderType").val(),
                "selectTableState":$("#selectTableState").val(),
                "currentStartTime":$("#currentStartTime").val()
            };
            httpPost("/queryData/downloadQueryData",param);
            $("#downLoad").removeAttr("onClick");
            $("#downLoad").attr("title","正在导出中，请勿重复点击");
        });
        setTimeout(function () {
            $("#downLoad").attr("onClick","downLoad()");
            $("#downLoad").removeAttr("title");
        },13000)
    }
    function  httpPost(URL,PARAMS) {
        var temp=document.createElement("form");
        temp.action=URL;
        temp.method="post";
        temp.style.display="none";
        for(var x in PARAMS){
            var opt=document.createElement("textarea");
            opt.name=x;
            opt.value=PARAMS[x];
            temp.appendChild(opt);
        }
        document.body.appendChild(temp);
        temp.submit();
        return temp;
    }
    function toBackView() {
        var serialize = $("#Search_form").serialize();
        window.location.href="/queryData/queryDataByWhere?"+serialize;
    }
    function doSearch(pageNum) {
        $("#div1").hide();
        $("#test").show();

        var totalPages = $("#totalPages").text();
        var m = totalPages.slice(1, -1);
        var n = parseInt(m);
        if(pageNum!=1){
            if (pageNum > n) {
                layer.alert("该页码不存在");
                return false;
            }
        }
        var re = /^[1-9]+[0-9]*]*$/;
        if (!re.test(pageNum)) {
            layer.alert("输入页码必须是正整数");
            return false;
        }
        $("#hidPageNum").val(pageNum);
        var pageSize=$("#pageSize").val();
        if(pageSize!=null){
            $("#hidPageSize").val(pageSize);
        }
        var param={
            "pageSize":$("#hidPageSize").val(),
            "pageNum":pageNum,
            "iEType":$("#iEType").val(),
            "currencyType":$("#currencyType").val(),
            "year":$("#year").val(),
            "startMonth":$("#startMonth").val(),
            "endMonth":$("#endMonth").val(),
            "monthFlag":$("#monthFlag").val(),
            "unitFlag":$("#unitFlag").val(),
            "codeLength":$("#codeLength").val(),
            "outerField1":$("#outerField1").val(),
            "outerField2":$("#outerField2").val(),
            "outerField3":$("#outerField3").val(),
            "outerField4":$("#outerField4").val(),
            "outerValue1":$("#outerValue1").val(),
            "outerValue2":$("#outerValue2").val(),
            "outerValue3":$("#outerValue3").val(),
            "outerValue4":$("#outerValue4").val(),
            "orderType":$("#orderType").val(),
            "selectTableState":$("#selectTableState").val(),
            "currentStartTime":$("#currentStartTime").val()
        };
        var url="/queryData/getQueryDataListByWhere";
       $("#div1").load(url,param,function () {
           $("#div1").show();
           $("#test").hide();
       });
    }