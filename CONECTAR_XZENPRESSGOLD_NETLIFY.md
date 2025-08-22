# 🔗 Conectar Xzenpressgold ao Netlify - Passo a Passo

## 🎯 **Repositório Confirmado:** 
✅ https://github.com/Zenpress/Xzenpressgold

## 📋 **PASSO A PASSO DETALHADO:**

### **1. Acessar Netlify:**
```
https://app.netlify.com
```

### **2. Conectar ao Repositório:**
1. **"New site from Git"** (botão verde)
2. **"GitHub"** (primeiro botão)
3. **Buscar:** `Xzenpressgold` ou `Aleksayev1/Xzenpressgold`
4. **Selecionar** quando aparecer

### **3. Configurações EXATAS:**
```
Repository: Zenpress/Xzenpressgold
Branch to deploy: main
Build command: npm run build
Publish directory: dist
Node version: 18
```

### **4. Environment Variables (OBRIGATÓRIO):**
```
VITE_PIX_PROVIDER=mock
VITE_PIX_KEY=aleksayevacupress@gmail.com
VITE_CREDIT_CARD_PROVIDER=mock
```

### **5. Deploy:**
- **"Deploy site"**
- **Aguardar 5-7 minutos**
- **Nova URL** será gerada

---

## 🔄 **CONECTAR SITE EXISTENTE (lambent-empanada):**

### **Se quiser manter a URL atual:**

1. **Acessar site existente:** lambent-empanada
2. **Site settings** → **Build & deploy**
3. **"Link to Git repository"**
4. **GitHub** → **Xzenpressgold**
5. **Configurar build settings** (mesmas configurações acima)

---

## 🎯 **RESULTADO ESPERADO:**

Após conectar:
- ✅ **Deploy automático** a cada push no GitHub
- ✅ **Sincronização** GitHub ↔ Netlify
- ✅ **Build automático** quando atualizar código
- ✅ **Site funcionando** perfeitamente

---

## 🆘 **SE DER ERRO NO BUILD:**

Possíveis problemas e soluções:
- **Node version:** Deve ser 18
- **Environment variables:** Devem estar configuradas
- **Build command:** Deve ser exatamente `npm run build`
- **Publish directory:** Deve ser `dist`

**Me avise se conseguir encontrar o repositório no Netlify agora!** 🚀