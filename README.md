# Оля и Коля — Remotion / GitHub Actions

Это **пятисекундный тест анимации персонажей**, не полный 38-секундный Reels. Сохраняются референс варианта 4, SVG-модели и движения по ключевым кадрам. Звук в тесте отсутствует.

## Запуск в GitHub Actions

1. Создайте новый репозиторий GitHub, например `izobilie-remotion`.
2. Загрузите в **корень** репозитория файлы и папки из этого архива, **включая скрытую `.github/workflows/render.yml`**. Сам ZIP целиком как один файл не загружайте — GitHub Actions не увидит workflow.
3. Откройте вкладку **Actions** → **Render Olya and Kolya (Remotion)** → **Run workflow** → **Run workflow**. При первом push на `main` workflow также должен запуститься автоматически.
4. По окончании откройте выбранный запуск → **Artifacts** → `olja-kolja-remotion-preview` — в архиве MP4 и PNG центрального кадра.

Workflow выполняет `npm install`, устанавливает браузер Remotion и вызывает `npm run render` на сервере GitHub. Для запуска не нужен локальный npm.

## Запуск локально

```bash
npm install
npx remotion browser ensure
npm run start
npm run render
```

## Файлы

- `src/rig.tsx` — риги Оли и Коли, суставы, мимика, пропсы и интерполяция.
- `src/scene.tsx` — тест сцены, ключевые позы и титр.
- `src/root.tsx` — Remotion composition `OlyaKolyaTest`: 1080x1920, 30 fps, 150 кадров.
- `reference_variant4.png` — утверждённый референс дизайна.
- `.github/workflows/render.yml` — автоматический рендер и артефакт.

## Ограничения

Проверка исходного кода не заменяет реального рендера; до первого успешного Action возможны ошибки TypeScript и несовместимость пакетов. Этот архив подготовлен для запуска, но **ещё не исполнялся в GitHub Actions**.
