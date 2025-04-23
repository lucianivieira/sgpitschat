# sgpitschat
Assistente IA SGPITS HU-UFPI

## Prompt V0:
crie uma pagina que integre um assistente da openai para ser usado como IA via interface web responsiva, no estilo whatsapp.
Crie uma pagina responsiva que integre um assistente de IA da OpenAI, simulando a experiência de um chat no estilo WhatsApp. A interface deve ser intuitiva e moderna, com um layout semelhante ao do WhatsApp Web, incluindo:

Cabeçalho: Exibir o nome do assistente e um indicador de status (online/offline).

Área de Chat: Exibir mensagens enviadas e recebidas em balões estilizados, diferenciando usuário e IA.

Entrada de Mensagem: Campo de texto para digitação, com botão de envio e suporte a atalhos (Enter para enviar).

Respostas da IA: As mensagens da OpenAI devem ser processadas em tempo real e exibidas de forma dinâmica, com efeito de digitação simulada.

Histórico de Conversas: Manter as interações recentes para melhor experiência do usuário.

Responsividade: Adaptar-se a diferentes tamanhos de tela (desktop, tablet e mobile).

Estilização: Utilizar Tailwind CSS ou Styled Components para um design moderno e limpo.

Backend: Conectar-se à API da OpenAI (via Next.js API routes) para processar e retornar respostas.

A implementação deve ser feita utilizando Next.js com suporte a Serverless Functions da Vercel para processar as requisições de IA.

### 1. Cabeçalho

- Nome do assistente com foto de perfil
- Indicador de status online (ponto verde)
- Ícones de ações como pesquisa, chamada e vídeo


### 2. Área de Chat

- Balões de mensagem estilizados como no WhatsApp
- Verde para mensagens do usuário (à direita)
- Branco para mensagens do assistente (à esquerda)
- Horário das mensagens e indicador de leitura
- Fundo com padrão do WhatsApp


### 3. Entrada de Mensagem

- Botão de envio que aparece apenas quando há texto
- Suporte para envio com a tecla Enter
- Desativação durante o processamento da resposta
- auto rolamento de tela durante a resposta

### 4. Respostas da IA

- Processamento em tempo real com a API da OpenAI 
- Efeito de digitação simulada com animação de "digitando..."
- Streaming de respostas para experiência mais natural


### 5. Histórico de Conversas

- sem histórico de conversas


### 6. Responsividade

- Layout adaptativo para desktop, tablet e mobile
- Barra lateral que se esconde automaticamente em telas pequenas
- Botão de retorno para navegação em dispositivos móveis


### 7. Estilização

- Design moderno e limpo usando Tailwind CSS
- Cores e elementos visuais inspirados no WhatsApp
- Animações suaves para transições


### 8. Backend

- Integração com a API da OpenAI via Next.js API routes 
- Tratamento de erros e feedback visual
- Suporte para streaming de respostas com a AI SDK 


## Como Funciona

A aplicação utiliza o hook `useAssistant` da AI SDK para gerenciar o estado do chat e a comunicação com o backend . O backend utiliza a função `AssistantResponse` para criar threads, adicionar mensagens e transmitir respostas de volta ao frontend .

Ajuste a rolagem da página para que o usuário possa ter o controle no momento da geração dos textos. Atualmente a pagina rola e o usuario nao consegue iniciar a leitura pois a rolagem nao permite ate o final da geração do texto. 
