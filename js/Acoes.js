$(document).ready(function () {
  

});


$(function () {
    $('html').on('click', '#btnAlterarLogo', function () {
        IncluirLogoMenu();
        IncluirLogoFooter();
    });
});

$(function () {
    $('html').on('click', '#ApagarCaminho', function () {
        alert("teste");
        var logoMenu = $("#CaminhoMenu").val();
        var logoRodape = $("#CaminhoRodape").val();
        alert(logoMenu, logoRodape);
    });
});


function IncluirLogoMenu() {

    var BinarioMenu = $("#Menu")[0].files[0];
    var Formulario = new FormData();
    Formulario.append("file", BinarioMenu);
    $.ajax({
        type: "POST",
        url: "/Colaborador/Logos/IncluirLogoMenu",
        data: Formulario,
        contentType: false,
        processData: false,
        error: function () {
            alert("Erro no envio do arquivo Logo Menu!");
            Imagem.attr("src", "/img/imagem-padrao.png");
            Imagem.removeClass("thumb");
        },
        success: function (data) {
            var caminho = data.caminho;
            Imagem.attr("src", caminho);
            Imagem.removeClass("thumb");
            CampoHidden.val(caminho);
            BtnExcluir.removeClass("btn-ocultar");
        }
    });
}

function IncluirLogoFooter() {

    var BinarioFooter = $("#Footer")[0].files[0];
    var Formulario = new FormData();
    Formulario.append("file", BinarioFooter);
    $.ajax({
        type: "POST",
        url: "/Colaborador/Logos/IncluirLogoFooter",
        data: Formulario,
        contentType: false,
        processData: false,
        error: function () {
            alert("Erro no envio do arquivo Logo Footer!");
            Imagem.attr("src", "/img/imagem-padrao.png");
            Imagem.removeClass("thumb");
        },
        success: function (data) {
            var caminho = data.caminho;
            Imagem.attr("src", caminho);
            Imagem.removeClass("thumb");
            CampoHidden.val(caminho);
            BtnExcluir.removeClass("btn-ocultar");
        }
    });
}
