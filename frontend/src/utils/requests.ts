export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

/*
process.env.REACT_APP_ = o prefixo é lá do netlify
BACKEND_URL = Variavel definina lá no netlify
 
está definindo que a BASE_URL da minha aplicação vai pegar a variavel definina lá no netlify

?? -> quer dizer se a variavel do netlify não estiver definida, ele pega e passa para a BASE_URL o localhost

*/