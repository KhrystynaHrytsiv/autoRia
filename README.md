<div style="text-align: center">

# 🚗 AutoRia API
REST API платформи з продажу авто: ролі з системою пермішинів, базовий/преміум акаунти, оголошення з автоконвертацією валют за курсом ПриватБанку, автоматична перевірка нецензурної лексики та статистика для Premium.
---
</div>

## 📚 Зміст

- [Можливості](#-можливості)
- [Технології](#-технології)
- [Запуск](#-запуск)
- [Бізнес-правила](#-бізнес-правила)
- [Змінні .env](#-змінні-env)
- [API](#-api)
- [Swagger](#-swagger)
- -[Postman](#-postman)


# ✨ Можливості

- 🔐 JWT Authentication
- 👥 Role Based Access
- 🚘 CRUD автомобілів(бренди і моделі)
- 📢 CRUD оголошень
- 💎 Premium акаунти
- 💰 Курси валют
- 📧 Email сервіс
- 🤖 Перевірка нецензурної лексики
- 📊 Статистика

---

# 🛠 Технології
Express.js · TypeScript · MongoDb  · JWT · Docker

---

# 🚀 Запуск
Потрібен лише Docker. У корені проєкту:
```bash

 git clone <repo>
 cd backend
 npm install
 docker compose up --build
```
---

Локальний запуск без Docker
```bash

cd backend
npm install
```
Використовувати для підключення MongoDB (.env)
MONGO_URI=mongodb://localhost:27017/autoRia
```bash
  npm run start
```

---

# 💼 Бізнес-правила

## 👥 Ролі

| Роль    | Можливості                                                                                                         |
|---------|--------------------------------------------------------------------------------------------------------------------|
| Client  | переглядає оголошення, бачить контакти продавця                                                                    | 
| Seller  | створює/редагує/видаляє свої оголошення, повідомляє про відсутні марки, купує Premium                              | 
| Manager | банить користувачів, модерує/видаляє будь-які оголошення, керує довідником марок. Створюється лише адміністратором | 
| Admin   | суперюзер — усі дозволи (лише замовник та партнери)                                                                |    

## 💎 Типи акаунтів

|                       | Basic(за замовучуванням) | Premium (купується)                                                           |
|-----------------------|--------------------------|-------------------------------------------------------------------------------|
| Кількість оголошень   | 1                        | без обмежень                                                                  |
| Статистика оголошень  | ні                       | перегляди (всього/день/тиждень/місяць), середня ціна по регіону та по Україні |

## 💳 Покупка Premium 
GET /users/premium


## 💰 Оголошення та валюти
Ціна вказується в одній валюті: USD, EUR або UAH.
Решта валют рахуються за курсом ПриватБанку: іноземна→UAH — за курсом купівлі (buy), UAH→іноземна — за курсом продажу (sale).
В оголошенні зберігаються: оригінальна ціна й валюта продавця, всі три перераховані ціни та знімок курсу (rateInfo), за яким рахували.
Курси оновлюються раз на день (cron o 8:00 за Києвом).


## 🚫 Перевірка нецензурної лексики
1. Кожне оголошення при створенні/редагуванні перевіряється автоматично.
2. Чистий текст → статус active, оголошення публікується.
3. Знайдено лайку → статус pending_edit, система пропонує відредагувати.
4. У продавця 3 спроби редагування. Після 3-ї невдалої — статус inactive і лист менеджеру, котрий зазначений у .env як EMAIL_USER.
5. Менеджер вручну активує/деактивує: .

## 🚘 Марки та моделі
Випадайки: GET /brands, GET /brands/:id/models.
Немає марки/моделі? Продавець повідомляє адміністрацію: POST /requests/brand-request  / POST /requests/model-request → менеджерам іде лист.


# 🔐 Змінні .env

MONGO_URI=mongodb://admin:admin@db:27017/autoRia
PORT=6000
JWT_ACCESS_SECRET=25f799f45bfe9565f69be22676c5900899c3e97bdf4284f590c016ae0ca1a6f510ea0e5fc7d83317

JWT_REFRESH_SECRET=356db7ca0e1895cfaae92f5cd8033bf37b27fc3a52635eafec41d935ff170ce42da3bdf3760ec4a9
JWT_ACCESS_LIFETIME=10m
JWT_REFRESH_LIFETIME=20m

PRIVAT_API_URL=https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5

EMAIL_USER=khrystyna.hrytsiv@gmail.com
EMAIL_PASSWORD=zwwmopngfhjluhpm


# 📦 API

| Метод  | Endpoint                      | Доступ                         | Опис                                     |
|--------|-------------------------------|--------------------------------|------------------------------------------|
| POST   | `/auth/register`              | Публічний                      | Реєстрація buyer/seller                  |
| POST   | `/auth/login`                 | Публічний                      | Вхід в систему (access + refresh)        |
| POST   | `/auth/refresh`               | Авторизований                  | Оновлення токенів                        |
| GET    | `/auth/me`                    | Авторизований                  | Мій профіль                              |
| POST   | `/users/create-manager`       | Admin                          | Створити менеджера                       |
| GET    | `/users  `                    | Admin/manager                  | Отримати всіх користувачів               |
| GET    | `/users/:id`                  | Admin/manager                  | Отримати поточного користувача           |
| PATCH  | `/users/:id/block`            | Admin/manager                  | Заблокувати користувача                  |
| PATCH  | `/users/:id/activate`         | Admin/manager                  | Активувати користувача                   |
| PATCH  | `/users/premium`              | Seller                         | Купити premium акаунт                    |
| GET    | `/adverts `                   | Публічний                      | Отримати всі оголошення                  |
| POST   | `/adverts`                    | Авторизований                  | Створити нове оголошення                 |
| GET    | `/adverts/:id`                | Публічний                      | Отримати поточне оголошення              |
| PUT    | `/adverts/:id`                | Власник/admin                  | Редагувати оголошення                    |
| DELETE | `/adverts/:id`                | Власник/manager/admin          | Видалити оголошення                      |
| GET    | `/adverts/:id/statistics`     | Premium-власник, manager/admin | Отримати статистику                      |
| GET    | `/brands `                    | Публічний                      | Випадаючий список брендів                |
| GET    | `/brands/:brandId/models`     | Публічний                      | Випадаючий список моделей                |
| POST   | `/requests/brands`            | Авторизований                  | Створити запит на новий бренд авто       |
| POST   | `/requests/models`            | Авторизований                  | Створити запит на нову модель авто       |
| GET    | `/requests/brands`            | Admin/manager                  | Отримати всі запити на додавання брендів |
| GET    | `/requests/models`            | Admin/manager                  | Отримати всі запити на додавання моделей |
| PATCH  | `/requests/brand/:id/approve` | Admin/manager                  | Підтвердити додавання бренду             |
| PATCH  | `/requests/model/:id/approve` | Admin/manager                  | Підтвердити додавання моделі             |
| PATCH  | `/requests/brand/:id/reject`  | Admin/manager                  | Відмовити у додавані бренду              |
| PATCH  | `/requests/model/:id/reject`  | Admin/manager                  | Відмовити у додавані моделі              |



---

# 📸 Swagger

Swagger UI: http://localhost:6000/docs


---
# 📮 Postman
Колекція: postman/autoRia.postman_collection.json

1. Імпортуйте файл у Postman (Import → File).
2. Запустіть API (docker compose up --build).
3. Виконайте будь-який Login із папки 1. Auth — токен автоматично збережеться у змінну {{accessToken}} і підставлятиметься в усі запити.
4. Перемикання "користувача" = виконання іншого Login-запиту.

Рекомендований сценарій перевірки:

1. Login (seller basic) → Create adverts (clean) → друге створення поверне 403 (ліміт базового акаунта).
2. Buy Premium → ліміт знято; Adverts statistics працює.
3. Create adverts (bad wards) → статус pending_edit; 3 рази Edit adverts з лайкою → inactive; Mail → лист менеджеру.
4. Login (manager/admin) → Update adverts → активація вручну.
5. Get adverts by id кілька разів (без токена) → Adverts statistics покаже перегляди та середні ціни.

❗️ Щоб створити Admin → Register → вручну у базі даних змінити роль на Admin 