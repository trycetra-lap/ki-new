async function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  const chatBox = document.getElementById('chat-box');
  const msg = document.createElement('div');
  msg.innerHTML = '<strong>Du:</strong> ' + text;
  chatBox.appendChild(msg);

  try {
    const response = await fetch('/.netlify/functions/ask-openai', {
      method: 'POST',
      body: JSON.stringify({ message: text }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    const reply = document.createElement('div');
    reply.innerHTML = '<strong>Reise-KI:</strong> ' + (data.reply || 'Fehler');
    chatBox.appendChild(reply);
  } catch (err) {
    const error = document.createElement('div');
    error.innerHTML = '<strong>Reise-KI:</strong> Fehler beim Laden der Antwort.';
    chatBox.appendChild(error);
  }

  input.value = '';
}