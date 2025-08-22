# 🔗 Conectar Netlify Existente ao GitHub - XZenpressbolt

## 🎯 **Objetivo:** Conectar `lambent-empanada.netlify.app` ao repositório `XZenpressbolt`

---

## 📋 **PASSO A PASSO DETALHADO:**

### **1. Acessar Site Existente no Netlify:**
```
1. Vá para: https://app.netlify.com
2. Encontre o site: "lambent-empanada-c88972"
3. Clique no site para abrir o dashboard
```

### **2. Conectar ao GitHub:**
```
1. No dashboard do site, vá em: "Site settings"
2. Menu lateral: "Build & deploy"
3. Seção "Continuous Deployment"
4. Clique em: "Link to Git repository"
```

### **3. Configurar Repositório:**
```
1. Selecione: "GitHub"
2. Autorize se necessário
3. Busque por: "XZenpressbolt" ou "Zenpress/XZenpressbolt"
4. Selecione o repositório
5. Branch: "main"
```

### **4. Configurar Build Settings:**
```
Build command: npm run build
Publish directory: dist
Production branch: main
```

### **5. Environment Variables (MANTER AS ATUAIS):**
```
VITE_PIX_PROVIDER=mock
VITE_PIX_KEY=aleksayevacupress@gmail.com
VITE_CREDIT_CARD_PROVIDER=mock
```

### **6. Trigger Deploy:**
```
1. Após conectar, clique: "Trigger deploy"
2. Ou: "Deploy site" 
3. Aguarde o build (3-5 minutos)
```

---

## 🔄 **CAMINHO ALTERNATIVO:**

### **Se não encontrar "Link to Git repository":**

#### **Opção A: Site Settings → General:**
```
1. Site settings → General
2. "Change site name" (opcional)
3. Procure por "Repository" ou "Git"
4. "Connect to Git repository"
```

#### **Opção B: Build & Deploy:**
```
1. Site settings → Build & deploy
2. "Link repository" ou "Connect repository"
3. Selecionar GitHub → XZenpressbolt
```

#### **Opção C: Deploy Settings:**
```
1. Deploys (aba principal)
2. "Deploy settings"
3. "Link to Git repository"
```

---

## 🆘 **SE NÃO CONSEGUIR ENCONTRAR:**

### **Método Manual Garantido:**

#### **1. Criar Novo Site Conectado:**
```
1. "New site from Git"
2. GitHub → XZenpressbolt
3. Configurar build settings
4. Deploy
```

#### **2. Transferir Domínio:**
```
1. No site antigo: Site settings → Domain management
2. Remover domínio personalizado (se tiver)
3. No site novo: Adicionar o mesmo domínio
```

#### **3. Deletar Site Antigo:**
```
1. Site antigo: Site settings → General
2. "Delete this site"
3. Confirmar exclusão
```

---

## 🎯 **RESULTADO ESPERADO:**

Após conectar:
- ✅ **Deploy automático** a cada push no GitHub
- ✅ **Mesma URL** (lambent-empanada)
- ✅ **Build automático** quando você atualizar código
- ✅ **Sincronização** GitHub ↔ Netlify

---

## 📞 **PRECISA DE AJUDA?**

Me diga:
1. **Consegue ver** "Site settings" no dashboard?
2. **Encontra** alguma opção relacionada a "Git" ou "Repository"?
3. **Quer que eu faça** um novo deploy conectado direto?

**Vamos resolver isso juntos!** 🚀