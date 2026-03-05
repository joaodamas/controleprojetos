# Sincronizar código local com produção

O repositório Git já foi inicializado nesta pasta. Para **puxar o código que está em produção** e deixar o local igual ao remoto, siga os passos abaixo.

## 1. Definir a URL do repositório de produção

Se o código em produção está num repositório Git (ex.: GitHub), você precisa da URL. Exemplos:

- **HTTPS:** `https://github.com/SEU_USUARIO/controleprojetos.git`
- **SSH:** `git@github.com:SEU_USUARIO/controleprojetos.git`

Substitua `SEU_USUARIO` e o nome do repositório pelo que você usa.

## 2. Adicionar o remote e puxar

No terminal, na pasta do projeto (`controleprojetos-main`), rode:

```bash
# Adicionar o remote (use a URL do seu repositório de produção)
git remote add origin "URL_DO_SEU_REPOSITORIO"

# Buscar as referências do remoto
git fetch origin

# Igualar a pasta ao que está na branch main em produção
# ATENÇÃO: isso descarta alterações locais não commitadas
git reset --hard origin/main
```

Se a branch de produção for outra (ex.: `master` ou `production`), troque `origin/main` por `origin/NOME_DA_BRANCH`.

## 3. Depois de sincronizar

- O conteúdo da pasta ficará **igual** ao da branch que você escolheu no remoto.
- A partir daí você pode criar uma branch para os ajustes locais, por exemplo:

```bash
git checkout -b meus-ajustes
# faça suas alterações...
git add .
git commit -m "Descrição dos ajustes"
```

## Resumo rápido (substitua a URL)

```bash
cd /Users/joaodamas/Downloads/controleprojetos-main
git remote add origin "https://github.com/SEU_USUARIO/controleprojetos.git"
git fetch origin
git reset --hard origin/main
```

Se o remote `origin` já existir (por exemplo, de um clone anterior), use:

```bash
git remote set-url origin "https://github.com/SEU_USUARIO/controleprojetos.git"
git fetch origin
git reset --hard origin/main
```
