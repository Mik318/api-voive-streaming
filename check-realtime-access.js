#!/usr/bin/env node

/**
 * Script para verificar acceso a OpenAI Realtime API
 * Uso: node check-realtime-access.js
 */

require('dotenv').config();
const https = require('https');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY no está configurada en .env');
  process.exit(1);
}

console.log('🔍 Verificando acceso a OpenAI Realtime API...\n');

// Verificar modelos disponibles
const options = {
  hostname: 'api.openai.com',
  path: '/v1/models',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);

      if (res.statusCode !== 200) {
        console.error(
          '❌ Error al consultar modelos:',
          response.error?.message || 'Error desconocido'
        );
        process.exit(1);
      }

      const models = response.data || [];
      const realtimeModels = models.filter((m) => m.id.includes('realtime'));

      console.log('📊 Resultados:\n');
      console.log(`Total de modelos disponibles: ${models.length}`);
      console.log(`Modelos Realtime encontrados: ${realtimeModels.length}\n`);

      if (realtimeModels.length > 0) {
        console.log('✅ ¡Tienes acceso a Realtime API!\n');
        console.log('Modelos Realtime disponibles:');
        realtimeModels.forEach((model) => {
          console.log(`  - ${model.id}`);
        });
        console.log('\n🎉 Puedes usar la funcionalidad de voz en tiempo real.');
      } else {
        console.log('❌ No tienes acceso a Realtime API\n');
        console.log('Posibles razones:');
        console.log('  1. Tu cuenta no tiene el tier necesario (requiere Tier 4+)');
        console.log('  2. Realtime API aún no está disponible públicamente');
        console.log('  3. Tu API key no tiene los permisos necesarios\n');
        console.log('📝 Soluciones:');
        console.log(
          '  - Verifica tu tier en: https://platform.openai.com/settings/organization/limits'
        );
        console.log('  - Contacta a OpenAI support para solicitar acceso');
        console.log('  - Usa una alternativa como ElevenLabs + OpenAI Chat');
      }

      // Buscar modelos GPT-4o
      const gpt4oModels = models.filter((m) => m.id.includes('gpt-4o'));
      if (gpt4oModels.length > 0) {
        console.log('\n📌 Modelos GPT-4o disponibles (para referencia):');
        gpt4oModels.slice(0, 5).forEach((model) => {
          console.log(`  - ${model.id}`);
        });
      }
    } catch (error) {
      console.error('❌ Error al parsear respuesta:', error.message);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error de conexión:', error.message);
  process.exit(1);
});

req.end();
