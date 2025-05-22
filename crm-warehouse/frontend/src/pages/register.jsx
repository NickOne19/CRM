import React from 'react';

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-teal-600 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Регистрация</h1>
        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Имя"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition-colors"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
