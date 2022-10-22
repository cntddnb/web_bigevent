$(function () {
  getUserInfo();

  var layer = layui.layer;
  $("#btnLogoout").on("click", function () {
    layer.confirm("是否退出登录?", { icon: 3, title: "提示" }, function (index) {
      //do something
      //   console.log("ok");
      // 清空本地存储中的token
      // 重新跳转到登录页面
      localStorage.removeItem("token");
      location.href = "/login.html";

      layer.close(index);
    });
  });
});

function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      //   console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      renderAvatar(res.data);
    },

    // 不论成功失败都会调用complete函数
    // complete: function (res) {
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     localStorage.removeItem("token");
    //     location.href = "/login.html";
    //   }

    //   //   console.log("执行了回调");
    //   //   console.log(res);
    // },
  });
}

function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
