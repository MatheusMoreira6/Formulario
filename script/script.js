$(function () {
    faker.locale = 'pt_BR';

    const margin = (($(window).height() / 2.0) - 316.65);
    $("#formulario").css("margin-top", margin + "px");
    $("#informacoes").css("margin-top", "50px");
    $("#informacoes").css("margin-bottom", margin + "px");
    $("#informacoes").css("display", "none");

    var nome = document.getElementById("inputNome");
    var email = document.getElementById("inputEmail");
    var telefone = document.getElementById("inputTelefone");
    var cep = document.getElementById("inputCep");

    var mascaraCep = {
        mask: '00.000-000'
    }
    var mascara = IMask(cep, mascaraCep);

    $("#gerar").on("click", function (evento) {
        nome.value = faker.name.findName();
        email.value = faker.internet.email().toLowerCase();
        telefone.value = faker.phone.phoneNumber('(##) #####-####');
        cep.value = faker.address.zipCode('##.###-###');
    });

    $("#enviar").on("click", function (evento) {
        if (verificarCEP(cep.value)) {
            $("#informacoes").css("display", "flex");

            $("#nome").html(nome.value);
            $("#email").html(email.value);
            $("#telefone").html(telefone.value);
            $("#cep").html(cep.value);

            $.get(`https://viacep.com.br/ws/${cep.value.replace(".", "")}/json/`, function (evento) {
                $("#logradouro").html(evento.logradouro);
                if (!evento.logradouro) {
                    $("#logradouro").html("Desconhecido");
                }

                $("#bairro").html(evento.bairro);
                if (!evento.bairro) {
                    $("#bairro").html("Desconhecido");
                }

                $("#localidade").html(evento.localidade);
                if (!evento.localidade) {
                    $("#localidade").html("Desconhecido");
                }

                $("#uf").html(evento.uf);
                if (!evento.uf) {
                    $("#uf").html("Desconhecido");
                }
            });
        } else {
            alert("CEP Inválido!");
        }
    });

    function verificarCEP(cep) {
        var formatacaoCEP = /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/;

        if (cep.length > 0) {
            if (formatacaoCEP.test(cep)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

});