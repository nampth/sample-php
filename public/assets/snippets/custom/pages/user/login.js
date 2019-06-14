var baseUrl = jQuery('#site_meta').attr('data-url');
var SnippetLogin = function () {
    jQuery.extend(jQuery.validator.messages, {
        required: "Thông tin không được để trống.",
        remote: "Please fix this field.",
        email: "Địa chỉ email bạn vừa điền không hợp lệ.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });

    var e = $("#m_login"), i = function (e, i, a) {
        var l = $('<div class="m-alert m-alert--outline alert alert-' + i + ' alert-dismissible" role="alert">\t\t\t<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\t\t\t<span></span>\t\t</div>');
        e.find(".alert").remove(), l.prependTo(e), mUtil.animateClass(l[0], "fadeIn animated"), l.find("span").html(a)
    }, a = function () {
        e.removeClass("m-login--forget-password"), e.removeClass("m-login--signup"), e.addClass("m-login--signin"), mUtil.animateClass(e.find(".m-login__signin")[0], "flipInX animated")
    }, l = function () {
        $("#m_login_forget_password").click(function (i) {
            i.preventDefault(), e.removeClass("m-login--signin"), e.removeClass("m-login--signup"), e.addClass("m-login--forget-password"), mUtil.animateClass(e.find(".m-login__forget-password")[0], "flipInX animated")
        }), $("#m_login_forget_password_cancel").click(function (e) {
            e.preventDefault(), a()
        }), $("#m_login_signup").click(function (i) {
            i.preventDefault(), e.removeClass("m-login--forget-password"), e.removeClass("m-login--signin"), e.addClass("m-login--signup"), mUtil.animateClass(e.find(".m-login__signup")[0], "flipInX animated")
        }), $("#m_login_signup_cancel").click(function (e) {
            e.preventDefault(), a()
        })
    };
    return {
        init: function () {
            l(), $("#m_login_signin_submit").click(function (e) {
                e.preventDefault();
                var a = $(this), l = $(this).closest("form");
                l.validate({
                    rules: {
                        username: {required: !0},
                        password: {required: !0}
                    }
                }), l.valid() && (a.addClass("m-loader m-loader--right m-loader--light").attr("disabled", !0), l.ajaxSubmit({
                    url: l.attr('action'),
                    success: function (e, t, r, s) {
                        if (t && t == 'success') {
                            window.location.href = e;
                        } else {
                            a.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), i(l, "danger", "Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại")
                        }
                    },
                    error: function (e) {
                        a.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), i(l, "danger", "Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại")
                    }
                }))
            }), $("#m_login_signup_submit").click(function (l) {
                l.preventDefault();
                var t = $(this), r = $(this).closest("form");
                r.validate({
                    rules: {
                        username: {required: !0},
                        fullname: {required: !0},
                        email: {required: !0, email: !0},
                        password: {required: !0},
                        rpassword: {required: !0},
                        agree: {required: !0}
                    }
                }), r.valid() && (t.addClass("m-loader m-loader--right m-loader--light").attr("disabled", !0), r.ajaxSubmit({
                    url: r.attr('action'),
                    success: function (l, s, n, o) {
                        setTimeout(function () {
                            if (s && s == 'success') {
                                window.location.href = baseUrl;
                            } else {
                                t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm(), a();
                                var l = e.find(".m-login__signin form");
                                l.clearForm(), l.validate().resetForm(), i(l, "success", "Đăng ký thành công.")
                            }
                        }, 2e3)
                    },
                    error: function (e) {
                        var text = '';
                        var errors = JSON.parse(e.responseText);
                        if (errors.errors) {
                            errors = errors.errors;
                            for (var key in errors) {
                                // check also if property is not inherited from prototype
                                if (errors.hasOwnProperty(key)) {
                                    var value = errors[key][0];
                                    text += value + '<br/>';
                                }
                            }
                        }
                        t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), i(r, "danger", text)
                    }
                }))
            }), $("#m_login_forget_password_submit").click(function (l) {
                l.preventDefault();
                var t = $(this), r = $(this).closest("form");
                r.validate({
                    rules: {
                        email: {
                            required: !0,
                            email: !0
                        }
                    }
                }), r.valid() && (t.addClass("m-loader m-loader--right m-loader--light").attr("disabled", !0), r.ajaxSubmit({
                    url: "",
                    success: function (l, s, n, o) {
                        setTimeout(function () {
                            t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm(), a();
                            var l = e.find(".m-login__signin form");
                            l.clearForm(), l.validate().resetForm(), i(l, "success", "Cool! Password recovery instruction has been sent to your email.")
                        }, 2e3)
                    }
                }))
            })
        }
    }
}();
jQuery(document).ready(function () {
    SnippetLogin.init()
});