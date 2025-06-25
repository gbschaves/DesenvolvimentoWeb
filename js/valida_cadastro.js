document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-cadastro");

  // Funções de validação para cada campo
  function validarNome(input) {
    const valor = input.value.trim();
    if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(valor)) {
      return "Nome inválido. Use pelo menos 3 letras.";
    }
    return "";
  }

  function validarCPF(input) {
    const valor = input.value.trim();
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor)) {
      return "CPF inválido. Use o formato 999.999.999-99.";
    }
    return "";
  }

  function validarDataNascimento(input) {
    const valor = input.value;
    if (!valor) return "Data de nascimento obrigatória.";
    const hoje = new Date();
    const nasc = new Date(valor);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    if (idade < 18) return "É necessário ter pelo menos 18 anos.";
    return "";
  }

  function validarCelular(input) {
    const valor = input.value.trim();
    if (!/^\d{2} \d{5}-\d{4}$/.test(valor)) {
      return "Celular inválido. Use o formato 99 99999-9999.";
    }
    return "";
  }

  function validarEmail(input) {
    const valor = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      return "E-mail inválido.";
    }
    return "";
  }

  function validarCEP(input) {
    const valor = input.value.trim();
    if (!/^(\d{5}-?\d{3})$/.test(valor)) {
      return "CEP inválido. Use o formato 99999-999.";
    }
    // Se válido, chama a busca do CEP
    pesquisacep(valor.replace('-', ''));
    return "";
  }

  // Mapeamento dos campos e suas funções de validação
  const campos = [
    { id: "nome", validar: validarNome },
    { id: "cpf", validar: validarCPF },
    { id: "data_nascimento", validar: validarDataNascimento },
    { id: "celular", validar: validarCelular },
    { id: "email", validar: validarEmail },
    { id: "cep", validar: validarCEP }
  ];

  campos.forEach(({ id, validar }) => {
    const input = form.querySelector(`#${id}`);
    const feedback = input.nextElementSibling;
    input.addEventListener("blur", function () {
      const msg = validar(input);
      if (msg) {
        input.classList.add("is-invalid");
        feedback.textContent = msg;
      } else {
        input.classList.remove("is-invalid");
        feedback.textContent = "";
      }
    });
  });

  // Impede o submit se houver campos inválidos
  form.addEventListener("submit", function (e) {
    let algumInvalido = false;
    campos.forEach(({ id, validar }) => {
      const input = form.querySelector(`#${id}`);
      const feedback = input.nextElementSibling;
      const msg = validar(input);
      if (msg) {
        input.classList.add("is-invalid");
        feedback.textContent = msg;
        algumInvalido = true;
      } else {
        input.classList.remove("is-invalid");
        feedback.textContent = "";
      }
    });
    if (algumInvalido) {
      e.preventDefault();
    } else {
      // Todos os campos válidos, exibe confirmação
      alert("Cadastro efetuado com sucesso! Seus dados foram enviados.");
      // O formulário será enviado normalmente após o alert
      // Se quiser impedir o envio real (apenas simular), adicione e.preventDefault() aqui também
    }
  });
});