import styles from "./LoginModal.module.css";
import React, { useState, useEffect, useRef } from "react";
import {Mail,Phone,User,AlertCircle,Clock,Send,X,ListOrdered,} from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

interface LoginModalProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  code: string;
  name: string;
  phone: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showTooltipRegistration, setShowTooltipRegistration] =
    useState<boolean>(false);
  const [timer, setTimer] = useState<number>(180);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isRegistrationComplete, setIsRegistrationComplete] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    code: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const intervalRef = useRef<number | null>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive, timer]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSendCode = () => {
    if (!validateEmail(formData.email)) {
      setErrors({ email: "Введите корректный email" });
      return;
    }

    setIsCodeSent(true);
    setIsTimerActive(true);
    setTimer(180);
    console.log("Код отправлен на", formData.email);
  };

  const handleResendCode = () => {
    if (timer === 0) {
      handleSendCode();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.code) {
      newErrors.code = "Введите код";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Вход:", formData);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistrationComplete) {
      if (!formData.code) {
        setErrors({ code: "Введите код подтверждения" });
        return;
      }
      console.log("Регистрация завершена:", formData);
      onClose();
      return;
    }

    const newErrors: Partial<FormData> = {};

    if (!formData.name) {
      newErrors.name = "Введите имя";
    }

    if (!formData.phone) {
      newErrors.phone = "Введите телефон";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Некорректный телефон";
    }

    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsRegistrationComplete(true);
    handleSendCode();
  };

  // Google авторизация 
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login success:", tokenResponse);

      try {
        // Получаем информацию о пользователе
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const userData = await userInfo.json();
        console.log("User data:", userData);

        onClose();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      alert("Ошибка авторизации через Google");
    },
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  // Быстрый вход через Telegram
  const handleTelegramLogin = () => {
    // логика авторизации через телеграм

    // Пример открытия Telegram авторизации
    const botName = ""; // На своего бота UserName
    const authUrl = `https://telegram.me/${botName}?start=auth`;
    window.open(authUrl, "_blank");
  };

  const handleTabChange = (isLoginTab: boolean) => {
    setIsLogin(isLoginTab);
    setFormData({ email: "", code: "", name: "", phone: "" });
    setErrors({});
    setIsCodeSent(false);
    setIsRegistrationComplete(false);
    setIsTimerActive(false);
    setTimer(180);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        <div className={styles.authForm}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
              onClick={() => handleTabChange(true)}
            >
              Вход
            </button>
            <button
              className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
              onClick={() => handleTabChange(false)}
            >
              Регистрация
            </button>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${
                      errors.email ? styles.inputError : ""
                    }`}
                    placeholder="example@mail.com"
                  />
                </div>
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="code" className={styles.label}>
                  Введите код для доступа в личный кабинет
                </label>
                <div className={styles.inputWrapper}>
                  <ListOrdered className={styles.inputIcon} size={20} />
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className={`${styles.input} ${styles.inputCase} ${
                      errors.code ? styles.inputError : ""
                    }`}
                    placeholder="Ведите код"
                    disabled={!formData.email || !isCodeSent}
                    maxLength={6}
                  />
                </div>
                {errors.code && (
                  <span className={styles.errorText}>{errors.code}</span>
                )}
              </div>

              {formData.email && (
                <div className={styles.codeActions}>
                  <div className={styles.codeHelp}>
                    <div className={styles.tooltipWrapper}>
                      <button
                        type="button"
                        className={styles.linkButton}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
                        <AlertCircle size={16} />
                        Не приходит код?
                      </button>
                      {showTooltip && (
                        <div className={styles.tooltip}>
                          Проверьте папку "Спам", возможно письмо попало туда
                        </div>
                      )}
                    </div>

                    <div className={styles.resendWrapper}>
                      {!isCodeSent ? (
                        <button
                          type="button"
                          className={styles.sendButton}
                          onClick={handleSendCode}
                        >
                          <Send size={16} />
                          Отправить код
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className={`${styles.linkButton} ${
                              timer > 0 ? styles.disabled : ""
                            }`}
                            onClick={handleResendCode}
                            disabled={timer > 0}
                          >
                            Отправить код повторно
                          </button>
                          {timer > 0 && (
                            <span className={styles.timer}>
                              <Clock size={16} />
                              {formatTime(timer)}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className={styles.submitButton}>
                Войти
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className={styles.form}>
              {!isRegistrationComplete ? (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Введите своё имя
                    </label>
                    <div className={styles.inputWrapper}>
                      <User className={styles.inputIcon} size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`${styles.input} ${
                          errors.name ? styles.inputError : ""
                        }`}
                        placeholder="Иван Иванов"
                      />
                    </div>
                    {errors.name && (
                      <span className={styles.errorText}>{errors.name}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Введите номер телефона
                    </label>
                    <div className={styles.inputWrapper}>
                      <Phone className={styles.inputIcon} size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`${styles.input} ${
                          errors.phone ? styles.inputError : ""
                        }`}
                        placeholder="+7 (999) 999-99-99"
                      />
                    </div>
                    {errors.phone && (
                      <span className={styles.errorText}>{errors.phone}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="reg-email" className={styles.label}>
                      Введите ваш Email
                    </label>
                    <div className={styles.inputWrapper}>
                      <Mail className={styles.inputIcon} size={20} />
                      <input
                        type="email"
                        id="reg-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`${styles.input} ${
                          errors.email ? styles.inputError : ""
                        }`}
                        placeholder="example@mail.com"
                      />
                    </div>
                    {errors.email && (
                      <span className={styles.errorText}>{errors.email}</span>
                    )}
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Зарегистрироваться
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.finalStep}>
                    <h3 className={styles.stepTitle}>Остался последний шаг!</h3>
                    <p className={styles.stepDescription}>
                      Введите код с Email для завершения регистрации
                    </p>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="reg-code" className={styles.label}>
                      Код подтверждения
                    </label>
                    <div className={styles.inputWrapper}>
                      <ListOrdered className={styles.inputIcon} size={20} />
                      <input
                        type="text"
                        id="reg-code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        className={`${styles.input} ${styles.inputCase} ${
                          errors.code ? styles.inputError : ""
                        }`}
                        placeholder="Ведите код"
                        maxLength={6}
                      />
                    </div>
                    {errors.code && (
                      <span className={styles.errorText}>{errors.code}</span>
                    )}
                  </div>

                  <div className={styles.codeActions}>
                    <div className={styles.codeHelp}>
                      <div className={styles.tooltipWrapper}>
                        <button
                          type="button"
                          className={styles.linkButton}
                          onMouseEnter={() => setShowTooltipRegistration(true)}
                          onMouseLeave={() => setShowTooltipRegistration(false)}
                        >
                          <AlertCircle size={16} />
                          Не приходит код?
                        </button>
                        {showTooltipRegistration && (
                          <div className={styles.tooltip}>
                            Проверьте папку "Спам", возможно письмо попало туда
                          </div>
                        )}
                      </div>

                      <div className={styles.resendWrapper}>
                        <button
                          type="button"
                          className={`${styles.linkButton} ${
                            timer > 0 ? styles.disabled : ""
                          }`}
                          onClick={handleResendCode}
                          disabled={timer > 0}
                        >
                          Отправить код повторно
                        </button>
                        {timer > 0 && (
                          <span className={styles.timer}>
                            <Clock size={16} />
                            {formatTime(timer)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Завершить регистрацию
                  </button>
                </>
              )}
            </form>
          )}

          <div className={styles.divider}>
            <span>или</span>
          </div>

          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.socialButton}
              onClick={handleTelegramLogin}
            >
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
              Войти через Telegram
            </button>

            <button
              type="button"
              className={styles.socialButton}
              onClick={handleGoogleLogin}
            >
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <g>
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </g>
              </svg>
              Войти через Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
