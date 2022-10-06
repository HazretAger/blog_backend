import { body } from "express-validator";

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
