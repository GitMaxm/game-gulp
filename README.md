# game-gulp

Одностраничный игровой лендинг Healas по макету Gogames: шапка с анимированным фоном, два блока с описанием продукта, тарифы с переключением карточек и слайдер. Статический HTML + SCSS, сборка на Gulp: стили компилируются с автопрефиксами и картой, скрипты минифицируются в `js/index.bundle.js`.

## Стек

HTML5, SCSS (dart-sass), Gulp 5, Autoprefixer, Swiper 10.

## Запуск

```bash
npm install
npm run dev      # сборка и Browser-Sync с отслеживанием файлов
npm run build    # разовая сборка css и js
```

## Структура

- `index.html` — разметка страницы
- `scss/main.scss` — входная точка стилей, собирает блоки из `scss/base/` и `scss/blocks/`
- `js/index.js` — мобильное меню, переключение тарифов и инициализация Swiper, минифицируется в `js/index.bundle.js`
- `gulpfile.mjs` — задачи сборки стилей и скриптов
- `css/main.css`, `css/main.css.map` — скомпилированные стили
- `img/` — изображения по секциям

## Деплой

GitHub Pages раздаёт корень ветки `main`.
