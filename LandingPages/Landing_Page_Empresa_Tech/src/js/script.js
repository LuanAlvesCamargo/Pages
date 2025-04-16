// Obtém os ícones de tema escuro e claro do DOM
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Altera os ícones dentro do botão com base nas configurações anteriores
if (localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    // Mostra o ícone de tema claro se o tema atual for escuro
    themeToggleLightIcon.classList.remove('hidden');
} else {
    // Mostra o ícone de tema escuro se o tema atual for claro
    themeToggleDarkIcon.classList.remove('hidden');
}

// Obtém o botão de alternância de tema do DOM
var themeToggleBtn = document.getElementById('theme-toggle');

// Adiciona um evento de clique ao botão de alternância de tema
themeToggleBtn.addEventListener('click', function() {

    // Alterna a visibilidade dos ícones dentro do botão
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // Verifica se o tema foi definido anteriormente no localStorage
    if (localStorage.getItem('color-theme')) {
        // Se o tema salvo for "light", muda para "dark"
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark'); // Adiciona a classe "dark" ao <html>
            localStorage.setItem('color-theme', 'dark'); // Salva o tema "dark" no localStorage
        } else {
            // Caso contrário, muda para "light"
            document.documentElement.classList.remove('dark'); // Remove a classe "dark" do <html>
            localStorage.setItem('color-theme', 'light'); // Salva o tema "light" no localStorage
        }

    // Se o tema não foi definido anteriormente no localStorage
    } else {
        // Verifica se o tema atual é "dark" e muda para "light"
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark'); // Remove a classe "dark" do <html>
            localStorage.setItem('color-theme', 'light'); // Salva o tema "light" no localStorage
        } else {
            // Caso contrário, muda para "dark"
            document.documentElement.classList.add('dark'); // Adiciona a classe "dark" ao <html>
            localStorage.setItem('color-theme', 'dark'); // Salva o tema "dark" no localStorage
        }
    }
});