require('dotenv').config();
const axios = require('axios');

async function obtenerRespuesta(mensaje) {
    if (!mensaje) {
        console.error("El mensaje está indefinido o vacío.");
        return;
    }

    // Verificar si la API Key está definida
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("Error: No se encontró la API Key de OpenAI. Asegúrate de definirla en tu archivo .env");
        return;
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Responde profesionalmente sobre medicina regenerativa. No hables de precios ni diagnósticos.' },
                    { role: 'user', content: mensaje }
                ],
                max_tokens: 100
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Verificar que la respuesta es válida antes de acceder a los datos
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            console.log(response.data.choices[0].message.content);
        } else {
            console.error("La respuesta de OpenAI no contiene datos válidos.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error.response?.data || error.message);
    }
}

// Prueba con un mensaje válido
obtenerRespuesta("¿Cómo funcionan las células madre mesenquimales?");
