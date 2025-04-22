/**
 * Obtém os tipos de caracteres selecionados pelo usuário.
 * @returns {string[]} Um array contendo os conjuntos de caracteres selecionados.
 */
function getCharacterTypes() {
    const charTypes = [];
    const options = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        specialCharacter: '!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`'
    };

    // Verifica cada checkbox e adiciona o conjunto correspondente ao array
    Object.keys(options).forEach(option => {
        if (document.querySelector(`#include_${option}`).checked) {
            charTypes.push(options[option]);
        }
    });

    return charTypes;
}

/**
 * Obtém o tamanho desejado da senha.
 * @returns {number|null} O tamanho da senha ou null se o valor for inválido.
 */
function getPasswordSize() {
    const size = parseInt(document.querySelector('#size').value, 10);

    // Valida o tamanho da senha
    if (isNaN(size) || size < 4 || size > 128) {
        displayMessage('Tamanho inválido, digite um número entre 4 e 128!', 'danger');
        return null;
    }

    return size;
}

/**
 * Gera uma senha com o tamanho e os tipos de caracteres especificados.
 * @param {number} size - O tamanho da senha.
 * @param {string[]} charTypes - Os conjuntos de caracteres selecionados.
 * @returns {string} A senha gerada.
 */
function generatePassword(size, charTypes) {
    if (!charTypes.length) return '';

    let password = '';
    const allCharacters = charTypes.join('');

    // Garante que pelo menos um caractere de cada tipo selecionado seja incluído
    charTypes.forEach(type => {
        password += type[Math.floor(Math.random() * type.length)];
    });

    // Preenche o restante da senha com caracteres aleatórios
    while (password.length < size) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Embaralha os caracteres da senha para maior aleatoriedade
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Exibe uma mensagem usando a biblioteca Toastify.
 * @param {string} text - O texto da mensagem.
 * @param {string} [status='success'] - O status da mensagem ('success' ou 'danger').
 */
function displayMessage(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}

/**
 * Lida com o evento de clique no botão "Gerar".
 */
function handleGenerateClick() {
    const size = getPasswordSize();
    const charTypes = getCharacterTypes();

    if (!size) return;

    if (!charTypes.length) {
        displayMessage('Selecione pelo menos um tipo de caractere!', 'danger');
        return;
    }

    const password = generatePassword(size, charTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = password;
}

/**
 * Lida com o evento de clique no botão "Copiar".
 */
function handleCopyClick() {
    const password = document.querySelector('#password').textContent;

    if (!password) {
        displayMessage('Nenhuma senha para copiar!', 'danger');
        return;
    }

    navigator.clipboard.writeText(password);
    displayMessage('Senha copiada com sucesso!', 'success');
}

// Adiciona os event listeners aos botões
document.querySelector('#generate').addEventListener('click', handleGenerateClick);
document.querySelector('#copy').addEventListener('click', handleCopyClick);