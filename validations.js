import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неккоректный формат почты").isEmail(),
  body("password", "Пароль должен быть не менее 5 символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Неккоректный формат почты").isEmail(),
  body("password", "Пароль должен быть не менее 5 символов").isLength({
    min: 5,
  }),
  body("firstName", "Имя должно содержать не менее 3 символов").isLength({
    min: 3,
  }),
  body("lastName", "Имя должно содержать не менее 3 символов").isLength({
    min: 3,
  }),
  body("avatarUrl", "Неверная ссылка на изображение").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тегов").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
