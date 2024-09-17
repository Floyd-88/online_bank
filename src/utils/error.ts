const ERROR_CODES: Record<string, string> = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
  INVALID_PASSWORD: 'Пароль неверный',
  INVALID_LOGIN_CREDENTIALS: 'Неверный логин или пароль. Пожалуйста, проверьте введенные данные',
  auth: 'Пожалуйста войдите в систему',
  EMAIL_EXISTS: 'Пользователь с данной почтой уже существует'
}
export function error(code: string): string {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}