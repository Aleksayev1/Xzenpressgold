# 🌐 Guia: Conectar Repositório no Netlify

## 🎯 **Objetivo:** Conectar `Aleksayev1/Xzenpressgold` ao Netlify

---

## 🔍 **PASSO A PASSO DETALHADO:**

### **1. Acessar Netlify:**
```
URL: https://app.netlify.com
```
- Faça login na sua conta Netlify

### **2. Criar Novo Site:**
1. **Clique em:** "New site from Git" (botão verde)
2. **Ou:** "Add new site" → "Import an existing project"

### **3. Conectar GitHub:**
1. **Clique em:** "GitHub" (primeiro botão)
2. **Autorizar Netlify** se solicitado
3. **Aguardar** carregamento dos repositórios

### **4. Encontrar seu Repositório:**

#### **Se não aparecer na lista:**
1. **Clique em:** "Configure Netlify on GitHub"
2. **Ou:** "Can't see your repo? Configure the Netlify app on GitHub"
3. **Autorizar acesso** ao repositório `Xzenpressgold`

#### **Buscar manualmente:**
1. **Digite na busca:** "Xzenpressgold"
2. **Ou:** "Aleksayev1/Xzenpressgold"
3. **Selecionar** quando aparecer

### **5. Configurar Build Settings:**

Quando encontrar o repositório, configure:

```
Repository: Aleksayev1/Xzenpressgold
Branch to deploy: main
Build command: npm run build
Publish directory: dist
```

### **6. Configurações Avançadas:**

#### **Environment Variables (CRÍTICO):**
```
VITE_PIX_PROVIDER=mock
VITE_PIX_KEY=aleksayevacupress@gmail.com
VITE_CREDIT_CARD_PROVIDER=mock
```

#### **Build Settings:**
```
Node version: 18
Package manager: npm
```

---

## 🆘 **SE NÃO CONSEGUIR ENCONTRAR:**

### **Problema 1: Repositório Privado**
**Solução:** Tornar público temporariamente
1. **GitHub** → `Xzenpressgold` → **Settings**
2. **Scroll down** → "Danger Zone"
3. **Change visibility** → "Make public"

### **Problema 2: Permissões GitHub**
**Solução:** Reautorizar Netlify
1. **GitHub** → **Settings** → **Applications**
2. **Netlify** → **Configure**
3. **Grant access** ao repositório

### **Problema 3: Nome do Repositório**
**Verificar se é exatamente:**
- `Aleksayev1/Xzenpressgold` (com X maiúsculo)
- Ou `Aleksayev1/xzenpressgold` (tudo minúsculo)

---

## 🔄 **ALTERNATIVA: Deploy Manual**

Se não conseguir conectar via GitHub:

### **1. Deploy via ZIP:**
1. **Baixar ZIP** do GitHub
2. **Netlify** → "Deploy manually"
3. **Arrastar ZIP** para a área de upload

### **2. Deploy via CLI:**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

---

## 🎯 **PRÓXIMO PASSO:**

**Tente primeiro:**
1. Acessar https://app.netlify.com
2. "New site from Git"
3. "GitHub"
4. Buscar por "Xzenpressgold"

**Se não encontrar, me diga:**
- O repositório é público ou privado?
- Aparece alguma mensagem de erro?
- Consegue ver outros repositórios seus?

**Vou te ajudar até conseguirmos conectar!** 🚀