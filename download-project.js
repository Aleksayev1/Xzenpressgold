const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Função para criar o ZIP do projeto
async function createProjectZip() {
  const output = fs.createWriteStream('xzenpress-projeto-completo.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Máxima compressão
  });

  // Configurar eventos
  output.on('close', function() {
    console.log('✅ Download criado com sucesso!');
    console.log(`📦 Arquivo: xzenpress-projeto-completo.zip`);
    console.log(`📊 Tamanho: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
    console.log('🎯 Projeto XZenPress completo empacotado!');
  });

  archive.on('error', function(err) {
    console.error('❌ Erro ao criar ZIP:', err);
    throw err;
  });

  // Conectar o archive ao output
  archive.pipe(output);

  // Adicionar todos os arquivos do projeto
  console.log('📁 Empacotando projeto XZenPress...');

  // Arquivos de configuração principais
  archive.file('package.json', { name: 'package.json' });
  archive.file('vite.config.ts', { name: 'vite.config.ts' });
  archive.file('tailwind.config.js', { name: 'tailwind.config.js' });
  archive.file('tsconfig.json', { name: 'tsconfig.json' });
  archive.file('tsconfig.app.json', { name: 'tsconfig.app.json' });
  archive.file('tsconfig.node.json', { name: 'tsconfig.node.json' });
  archive.file('postcss.config.js', { name: 'postcss.config.js' });
  archive.file('index.html', { name: 'index.html' });
  archive.file('README.md', { name: 'README.md' });
  archive.file('.env.example', { name: '.env.example' });

  // Configurações de deploy
  archive.file('netlify.toml', { name: 'netlify.toml' });
  archive.file('capacitor.config.ts', { name: 'capacitor.config.ts' });

  // Documentação
  archive.file('GUIA_LANCAMENTO.md', { name: 'docs/GUIA_LANCAMENTO.md' });
  archive.file('PROJETO_COMPLETO.md', { name: 'docs/PROJETO_COMPLETO.md' });
  archive.file('GUIA_PWA_BUILDER.md', { name: 'docs/GUIA_PWA_BUILDER.md' });
  archive.file('DESCRICOES_PROJETO.md', { name: 'docs/DESCRICOES_PROJETO.md' });
  archive.file('GUIA_STRIPE_OFICIAL.md', { name: 'docs/GUIA_STRIPE_OFICIAL.md' });
  archive.file('RESPOSTA_GOOGLE_PLAY.md', { name: 'docs/RESPOSTA_GOOGLE_PLAY.md' });
  archive.file('COMO_FAZER_PUSH_GITHUB.md', { name: 'docs/COMO_FAZER_PUSH_GITHUB.md' });
  archive.file('GUIA_BUILD_ANDROID_FINAL.md', { name: 'docs/GUIA_BUILD_ANDROID_FINAL.md' });
  archive.file('GUIA_STRIPE_CONFIGURACAO.md', { name: 'docs/GUIA_STRIPE_CONFIGURACAO.md' });
  archive.file('android-build-instructions.md', { name: 'docs/android-build-instructions.md' });

  // Pasta src completa
  archive.directory('src/', 'src/');

  // Pasta public
  archive.directory('public/', 'public/');

  // Configurações Android
  archive.directory('android/', 'android/');

  // Configurações Supabase
  archive.directory('supabase/', 'supabase/');

  // Finalizar o arquivo
  await archive.finalize();
}

// Executar a função
createProjectZip().catch(console.error);