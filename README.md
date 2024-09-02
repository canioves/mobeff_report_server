## Техническое задание Effective Mobile
### Сервис отчетов

В этом сервисе два эндпоинта:
1. */report/create* - post запрос, который создает запись в таблице Reports и начинает генерацию excel файла. Генерация отчета начинается через 10 секунд после получения запроса.
   
   Пример тела запроса:
   ```json
   {
    "serviceName": "http://localhost:3000",
    "endpoint": "products",
    "headers": ["id", "name", "category", "price"],
    "limit": 21,  
    "page": 5
   }
   ```
   limit и page - опциональны.

   В ответ приходит айдишник отчета.

3. */report/{id}* - get запрос с параметром в виде айдишника отчета.
   
   Пример ответа о время генерации отчета:
   ```json
   {
    "id": 1,
    "status": "in progress",
    "fileUrl": null
   }
   ```

   Пример ответа после завершения генерации
   ```json
   {
    "id": 1,
    "status": "done",
    "fileUrl": "path\\to\\report1.xlsx"
   }
   ```
   Если что-то пошло не так:
      ```json
   {
    "id": 1,
    "status": "failed",
    "fileUrl": null
   }
   ```
   Сгенерированные отчеты хранятся в папке *reports*.
   
