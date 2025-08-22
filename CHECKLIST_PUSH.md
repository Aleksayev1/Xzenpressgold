# ✅ Checklist para Push GitHub - XZenpressbolt

## 📋 **ANTES DO PUSH:**

### **Arquivos Obrigatórios:**
- [ ] `package.json` ⭐ **CRÍTICO**
- [ ] `vite.config.ts`
- [ ] `tailwind.config.js`
- [ ] `tsconfig.json`
- [ ] `netlify.toml` ⭐ **CRÍTICO**
- [ ] `index.html`
- [ ] `.env.example`
- [ ] `README.md`

### **Código Fonte:**
- [ ] `src/App.tsx` ⭐ **CRÍTICO**
- [ ] `src/main.tsx`
- [ ] `src/index.css`
- [ ] Toda pasta `src/components/`
- [ ] Toda pasta `src/contexts/`
- [ ] Toda pasta `src/hooks/`
- [ ] Toda pasta `src/services/`
- [ ] Toda pasta `src/data/`
- [ ] Toda pasta `src/types/`
- [ ] Toda pasta `src/lib/`

### **Assets Públicos:**
- [ ] `public/manifest.json`
- [ ] `public/sw.js`
- [ ] `public/Logo Xzenpress oficial.png`
- [ ] `public/sounds/ocean.mp3`
- [ ] `public/sounds/rain.mp3`
- [ ] Todas as imagens dos pontos de acupressão

### **Configurações Android:**
- [ ] `android/app/build.gradle`
- [ ] `android/app/src/main/AndroidManifest.xml`
- [ ] Toda estrutura `android/`

### **Backend Supabase:**
- [ ] `supabase/migrations/` (ambos arquivos SQL)

---

## 🧪 **TESTES LOCAIS:**

### **Comandos para Executar:**
```bash
# 1. Instalar dependências
npm install

# 2. Testar build
npm run build

# 3. Verificar se dist/ foi criada
ls -la dist/

# 4. Testar preview local
npm run preview
```

### **Verificações:**
- [ ] `npm install` sem erros
- [ ] `npm run build` bem-sucedido
- [ ] Pasta `dist/` criada com arquivos
- [ ] `npm run preview` abre o site funcionando

---

## 📤 **COMANDOS DO PUSH:**

```bash
# 1. Inicializar Git
git init

# 2. Adicionar remote
git remote add origin https://github.com/Aleksayev1/XZenpressbolt.git

# 3. Adicionar arquivos
git add .

# 4. Commit
git commit -m "🚀 XZenPress v2.3.1 - Versão Final Corrigida"

# 5. Push
git branch -M main
git push -u origin main
```

---

## 🌐 **APÓS O PUSH:**

### **No Netlify:**
1. **New site from Git**
2. **Conectar GitHub** → `XZenpressbolt`
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### **Environment Variables:**
```
VITE_PIX_PROVIDER=mock
VITE_PIX_KEY=aleksayevacupress@gmail.com
VITE_CREDIT_CARD_PROVIDER=mock
```

### **Deploy Settings:**
- [ ] Auto-deploy habilitado
- [ ] Branch: `main`
- [ ] Build hooks configurados

---

## 🚨 **PROBLEMAS COMUNS:**

### **Se build falhar:**
- Verificar Node version (deve ser 18)
- Verificar se todas as dependências estão no package.json
- Verificar imports/exports nos arquivos

### **Se página continuar em branco:**
- Verificar console do navegador (F12)
- Verificar se Service Worker está funcionando
- Verificar redirects no netlify.toml

### **Se não encontrar o site no Netlify:**
- Verificar se está logado na conta correta
- Procurar por "lambent-empanada" na busca
- Verificar se o deploy foi bem-sucedido

---

## 🎯 **RESULTADO ESPERADO:**

Após seguir todos os passos:
- ✅ Site funcionando em nova URL Netlify
- ✅ Todas as páginas carregando
- ✅ PWA instalável
- ✅ Pagamentos em modo demo funcionando
- ✅ Todos os recursos ativos

**Execute passo a passo e me avise onde parar!** 🚀