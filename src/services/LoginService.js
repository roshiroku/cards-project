const STORAGE_KEY = "loginAttempts";
const MAX_ATTEMPTS = 3;
const BAN_HRS = 24;
const BAN_DURATION = BAN_HRS * 60 * 60 * 1000;
const RESET_ATTEMPTS_HRS = 0.25;
const RESET_ATTEMPTS_DURATION = RESET_ATTEMPTS_HRS * 60 * 60 * 1000;

export default class LoginService {
  static get attempts() {
    const attempts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { count: 0 };

    if (attempts.date) {
      const elapsed = Date.now() - attempts.date;
      const isResetAttempts = attempts.count < MAX_ATTEMPTS && elapsed > RESET_ATTEMPTS_DURATION;
      const isBanOver = attempts.count >= MAX_ATTEMPTS && elapsed > BAN_DURATION;

      if (isResetAttempts || isBanOver) {
        attempts.count = 0;
        delete attempts.date;
      }
    }

    return attempts;
  }

  static set attempts(attempts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  }

  static get banTime() {
    const { count, date } = this.attempts;

    if (date && count >= MAX_ATTEMPTS) {
      const elapsed = Date.now() - date;
      return Math.max(0, BAN_DURATION - elapsed);
    }

    return 0;
  }

  static get isBanned() {
    return this.banTime > 0;
  }

  static onSuccess() {
    localStorage.removeItem(STORAGE_KEY);
  }

  static onFail() {
    const { count } = this.attempts;
    this.attempts = { count: count + 1, date: Date.now() };
  }
}