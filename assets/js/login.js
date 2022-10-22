$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 从 layui 中获取 form 对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
    repwd: function (value, item) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });
  $("#form_reg").on("submit", function (e) {
    // 阻止默认的提交行为防止网页刷新
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功");
        // console.log('注册成功');
        $("#link_login").click();
      }
    );
  });
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(), // 快速获取表单中的数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg("登录成功");
        localStorage.setItem("token", res.token);
        // console.log(res.token);
        location.href = "/index.html";
      },
    });
  });
});
