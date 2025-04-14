# 项目部署指南

## 第一步：GitHub仓库配置

### 1. 初始化Git仓库
```bash
git init
```

### 2. 配置Git用户信息（如果未配置）
```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

### 3. 添加项目文件
```bash
git add .
git commit -m "初始化项目"
```

### 4. 连接GitHub仓库
1. 在GitHub网站创建新仓库
2. 复制仓库URL
3. 添加远程仓库：
```bash
git remote add origin <你的仓库URL>
```

### 5. 推送代码到GitHub
```bash
git push -u origin main
```

## 第二步：Vercel部署

### 1. 准备工作
- 注册Vercel账号：https://vercel.com
- 将GitHub账号与Vercel关联

### 2. 导入项目
1. 登录Vercel控制台
2. 点击「New Project」
3. 从GitHub仓库列表中选择你的项目
4. 点击「Import」

### 3. 配置部署选项
1. 项目名称：可以保持默认或自定义
2. 构建设置：Vercel会自动检测Next.js项目，通常无需修改
3. 环境变量：如果项目需要，在这里添加

### 4. 部署
1. 点击「Deploy」按钮
2. 等待部署完成
3. 部署成功后，Vercel会提供一个域名，可以通过这个域名访问你的项目

## 更新部署

当你需要更新项目时：

1. 提交本地更改：
```bash
git add .
git commit -m "更新说明"
```

2. 推送到GitHub：
```bash
git push origin main
```

3. Vercel会自动检测到更改并重新部署

## 注意事项

- 确保.gitignore文件正确配置，排除不需要的文件
- 部署前检查所有环境变量是否配置完整
- 确保package.json中的构建命令正确
- 如遇到问题，可以查看Vercel的部署日志