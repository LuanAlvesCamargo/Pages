// Verifica se o tema salvo no localStorage é "dark" 
// ou se não há tema salvo e o sistema do usuário está configurado para o modo escuro.
if (localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {

    // Adiciona a classe "dark" ao elemento <html>, ativando o tema escuro.
    document.documentElement.classList.add('dark');
} else {
    // Remove a classe "dark" do elemento <html>, desativando o tema escuro.
    document.documentElement.classList.remove('dark');
}