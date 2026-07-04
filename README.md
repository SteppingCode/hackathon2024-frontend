# FindSport Frontend

<div align="center">

[![License](https://img.shields.io/badge/license-GPL3.0-red.svg)](LICENSE)
[![Svelte](https://img.shields.io/badge/Svelte-5.x-ff3e00?logo=svelte)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Status](https://img.shields.io/badge/status-finished-success)](https://github.com/SteppingCode/hackathon2024-frontend)

</div>

FindSport Frontend — современная веб-панель на SvelteKit, предназначенная для взаимодействия с RESTful API и обеспечения удобного пользовательского опыта в системе FindSport. Проект объединяет современный UI, гибкую архитектуру компонентов и работу с административными сценариями, соревнованиями, федерациями и профилями пользователей.

## ✨ Почему это важно

Этот интерфейс обеспечивает:

- понятную работу с соревнованиями и заявками;
- удобную авторизацию и управление профилем;
- административные сценарии для работы с федерациями и пользователями;
- единый визуальный стиль на базе Tailwind и UI-компонентов.

## 🛠 Технологический стек

- SvelteKit — frontend framework для SPA
- Svelte 5 — реактивный UI
- Tailwind CSS — адаптивная стилизация
- shadcn/ui-подход и готовые UI-компоненты — дизайн-система и быстрый старт
- Axios — HTTP-клиент для backend-интеграции
- Lucide Svelte — иконки
- ESLint + Prettier — качество и консистентность кода

## 🚀 Основные возможности

- современный интерфейс с карточками, таблицами и диалогами;
- разделы для соревнований, создания заявок и административных операций;
- работа с настройками пользователя и профилем;
- интеграция с FastAPI backend через REST API;
- расширяемая структура компонентов для дальнейшего развития продукта.

## 📁 Структура проекта

```text
frontend/
  src/
    lib/
      api.js              # API-клиент
      components/         # UI-компоненты
      hooks/              # кастомные хуки
      utils.js            # утилиты
    routes/               # страницы приложения
    store/                # состояние приложения
  static/                 # статические ресурсы
```

## ✅ Требования

Для локальной разработки потребуется:

- Node.js 18+
- pnpm или npm

## ▶️ Установка

```bash
cd frontend
pnpm install
```

Если используете npm:

```bash
npm install
```

## 🔧 Локальный запуск

```bash
pnpm dev
```

Обычно приложение доступно по адресу:

```text
http://localhost:5173
```

## 🧱 Сборка для продакшена

```bash
pnpm build
```

Предпросмотр сборки:

```bash
pnpm preview
```

## 🧪 Проверка качества кода

```bash
pnpm lint
```

```bash
pnpm format
```

## 🔌 Интеграция с backend

Фронтенд взаимодействует с FastAPI backend через REST API. Для полноценной работы локально необходимо, чтобы backend был запущен и доступен по корректному адресу.

## 📌 Примечание

Этот репозиторий содержит фронтенд-часть проекта. Для полноценного использования требуется отдельный backend на FastAPI.

## 📄 Лицензия

Проект распространяется в соответствии с лицензией, указанной в файле LICENSE.
