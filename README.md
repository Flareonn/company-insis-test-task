# Инструкция по инициализации

1. npm install
2. npm run dev

# Комментарии

## API

1. Эндпоинт не был изначально построен для того, чтобы получать списки всех подразделений по соответствующему региону, из-за чего можно здесь встретить некоторые костыльные решения при обращении к нему.\
   Это можно увидеть на `./service/divisions.service.ts:23`, метод `getAllDivisions`. Который отражает как бы "все подразделения", но на самом деле отдаёт 4 запроса с каждым типом подразделения отдельно

2. Чтобы получать хоть какие-нибудь подразделения на страницах с отдельными типами, было решено по умолчанию отправлять запрос с query параметром, соответствующему коду региона.

3. Постраничный вывод подразделений так же невозможен, как и было замечено в ответе к моему вопросу по тестовому заданию. Всё что удалось - увеличить количество отражаемых подразделений с 10 до 20, через установку `{ query: { count: 20 } }`

4. Фильтр подразделений по названию или коду подразделения возможен через обычный запрос с параметром фильтра, или же, посредством компонента PrimeVue. Нативная реализация фильтрации находится на `./src/main.ts:28`

## Регион

Регион был задан статично - "66", но его можно изменить на динамический, через запрос POST https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address c query параметром айпи адреса клиента.

## Оптимизации

Для сокращения количества запросов к эндпоинту было решено реализовать небольшой кеширующий сервис

Для получения количества всех подразделений, из-за отсутствия такой возможности у эндпоинта был реализован стор, который хранит все ответы в одном месте и отдаёт их через геттер.

## Графики

Судя по макету, каждый из графиков использует небольшой плагин, для кастомизированного отображения тултипов (`BarChart`) или легенды (`DoughnutChart`).

Их реализация располагается в `./plugins/chart/`. Представляет из себя модифицированную реализацию из документации.
