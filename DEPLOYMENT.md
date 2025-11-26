# GitHub Pages 部署指南

## 已完成的工作

✅ 已配置 Vite 以支持 GitHub Pages 部署
✅ 已创建 GitHub Actions 工作流文件
✅ 已更新 .gitignore 文件
✅ 已初始化 Git 仓库

## 接下来的步骤

### 1. 配置 Git 用户信息（如果还没有配置）

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

或者仅为当前仓库配置：

```bash
git config user.name "你的名字"
git config user.email "你的邮箱"
```

### 2. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库（例如：`huachuang-yunsheng-tech`）
3. **不要**初始化 README、.gitignore 或 license（因为我们已经有了）

### 3. 推送代码到 GitHub

```bash
# 添加远程仓库（将 YOUR_USERNAME 替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/huachuang-yunsheng-tech.git

# 将分支重命名为 main（如果当前不是 main）
git branch -M main

# 推送代码
git push -u origin main
```

### 4. 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分，选择：
   - **Source**: `GitHub Actions`
5. 保存设置

### 5. 配置 GitHub Secrets（用于 API 密钥）

如果你的项目需要 `GEMINI_API_KEY`：

1. 进入仓库的 **Settings** > **Secrets and variables** > **Actions**
2. 点击 **New repository secret**
3. 添加：
   - **Name**: `GEMINI_API_KEY`
   - **Value**: 你的 API 密钥
4. 点击 **Add secret**

### 6. 触发部署

- 当你推送代码到 `main` 分支时，GitHub Actions 会自动构建和部署
- 你也可以在 **Actions** 标签页手动触发工作流

### 7. 访问你的网站

部署完成后，你的网站将在以下地址可用：
- `https://YOUR_USERNAME.github.io/huachuang-yunsheng-tech/`

## 注意事项

- 如果仓库名是 `YOUR_USERNAME.github.io`，网站将部署在根路径 `https://YOUR_USERNAME.github.io/`
- 首次部署可能需要几分钟时间
- 你可以在 **Actions** 标签页查看部署状态和日志

