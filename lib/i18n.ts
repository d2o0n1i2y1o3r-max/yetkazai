import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      nav: {
        home: 'Bosh sahifa',
        dashboard: 'Dashboard',
        newOrder: 'Yangi buyurtma',
        routes: 'Marshrutlar',
        deliveries: 'Yetkazib berishlar'
      },
      landing: {
        heroTitle: 'Yetkazib berishni optimallashtiring',
        heroSubtitle: 'Kichik bizneslar uchun eng yaxshi kuryer xizmatlarini taqqoslang va marshrutlarni optimallashtiring',
        cta: 'Demo sinash',
        problem: 'Muammo',
        problemText: 'Kichik bizneslar kuryerlarni qo\'lda tanlash uchun ko\'p vaqt sarflaydi va ko\'pincha qimmat xizmatlarni tanlaydi',
        solution: 'Yechim',
        solutionText: 'YetkazAI sizga eng arzon va tez kuryer xizmatlarini avtomatik taqqoslab beradi',
        howItWorks: 'Qanday ishlaydi',
        step1: 'Buyurtmani yarating',
        step2: 'Kuryerlarni taqqoslang',
        step3: 'Eng yaxshisini tanlang'
      },
      dashboard: {
        title: 'Dashboard',
        todayDeliveries: 'Bugungi yetkazib berishlar',
        total: 'Jami',
        inProgress: 'Yo\'lda',
        delivered: 'Yetkazildi',
        totalCost: 'Jami xarajat',
        avgCost: 'O\'rtacha xarajat',
        last7Days: 'Oxirgi 7 kun'
      },
      newOrder: {
        title: 'Yangi buyurtma',
        pickupAddress: 'Manzilni olish',
        dropoffAddress: 'Yetkazib berish manzili',
        packageSize: 'Paket o\'lchami',
        packageWeight: 'Paket vazni',
        urgency: 'Tezlik',
        standard: 'Standart',
        express: 'Tezkor',
        submit: 'Buyurtma berish',
        comparing: 'Kuryerlarni taqqoslash...',
        recommended: 'Tavsiya etiladi',
        price: 'Narx',
        time: 'Vaqt',
        rating: 'Reyting',
        selectCourier: 'Kuryerni tanlang'
      },
      routes: {
        title: 'Marshrut optimallashtirish',
        addStop: 'To\'xtash nuqtasi qo\'shish',
        optimize: 'Optimallashtirish',
        optimized: 'Marshrut optimallashtirildi',
        timeSaved: 'daqiqa tejaldi',
        distance: 'Masofa'
      },
      deliveries: {
        title: 'Yetkazib berishlar',
        status: 'Holat',
        courier: 'Kuryer',
        cost: 'Narx',
        time: 'Vaqt',
        pending: 'Kutilmoqda',
        inTransit: 'Yo\'lda',
        delivered: 'Yetkazildi',
        advanceStatus: 'Holatni o\'zgartirish'
      },
      common: {
        loading: 'Yuklanmoqda...',
        error: 'Xatolik yuz berdi',
        success: 'Muvaffaqiyatli'
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная',
        dashboard: 'Дашборд',
        newOrder: 'Новый заказ',
        routes: 'Маршруты',
        deliveries: 'Доставки'
      },
      landing: {
        heroTitle: 'Оптимизируйте доставку',
        heroSubtitle: 'Сравнивайте лучшие курьерские службы и оптимизируйте маршруты для малого бизнеса',
        cta: 'Попробовать демо',
        problem: 'Проблема',
        problemText: 'Малый бизнес тратит много времени на ручной выбор курьеров и часто выбирает дорогие службы',
        solution: 'Решение',
        solutionText: 'YetkazAI автоматически сравнивает самые дешевые и быстрые курьерские службы',
        howItWorks: 'Как это работает',
        step1: 'Создайте заказ',
        step2: 'Сравните курьеров',
        step3: 'Выберите лучший'
      },
      dashboard: {
        title: 'Дашборд',
        todayDeliveries: 'Доставки сегодня',
        total: 'Всего',
        inProgress: 'В пути',
        delivered: 'Доставлено',
        totalCost: 'Общая стоимость',
        avgCost: 'Средняя стоимость',
        last7Days: 'Последние 7 дней'
      },
      newOrder: {
        title: 'Новый заказ',
        pickupAddress: 'Адрес pickup',
        dropoffAddress: 'Адрес доставки',
        packageSize: 'Размер посылки',
        packageWeight: 'Вес посылки',
        urgency: 'Срочность',
        standard: 'Стандарт',
        express: 'Экспресс',
        submit: 'Оформить заказ',
        comparing: 'Сравнение курьеров...',
        recommended: 'Рекомендуется',
        price: 'Цена',
        time: 'Время',
        rating: 'Рейтинг',
        selectCourier: 'Выберите курьера'
      },
      routes: {
        title: 'Оптимизация маршрута',
        addStop: 'Добавить остановку',
        optimize: 'Оптимизировать',
        optimized: 'Маршрут оптимизирован',
        timeSaved: 'минут сэкономлено',
        distance: 'Расстояние'
      },
      deliveries: {
        title: 'Доставки',
        status: 'Статус',
        courier: 'Курьер',
        cost: 'Стоимость',
        time: 'Время',
        pending: 'Ожидание',
        inTransit: 'В пути',
        delivered: 'Доставлено',
        advanceStatus: 'Изменить статус'
      },
      common: {
        loading: 'Загрузка...',
        error: 'Произошла ошибка',
        success: 'Успешно'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        dashboard: 'Dashboard',
        newOrder: 'New Order',
        routes: 'Routes',
        deliveries: 'Deliveries'
      },
      landing: {
        heroTitle: 'Optimize Your Delivery',
        heroSubtitle: 'Compare the best courier services and optimize routes for small businesses',
        cta: 'Try Demo',
        problem: 'Problem',
        problemText: 'Small businesses spend hours manually picking couriers and often overpay for delivery services',
        solution: 'Solution',
        solutionText: 'YetkazAI automatically compares the cheapest and fastest courier services for you',
        howItWorks: 'How It Works',
        step1: 'Create Order',
        step2: 'Compare Couriers',
        step3: 'Choose Best'
      },
      dashboard: {
        title: 'Dashboard',
        todayDeliveries: 'Today\'s Deliveries',
        total: 'Total',
        inProgress: 'In Progress',
        delivered: 'Delivered',
        totalCost: 'Total Cost',
        avgCost: 'Average Cost',
        last7Days: 'Last 7 Days'
      },
      newOrder: {
        title: 'New Order',
        pickupAddress: 'Pickup Address',
        dropoffAddress: 'Delivery Address',
        packageSize: 'Package Size',
        packageWeight: 'Package Weight',
        urgency: 'Urgency',
        standard: 'Standard',
        express: 'Express',
        submit: 'Place Order',
        comparing: 'Comparing couriers...',
        recommended: 'Recommended',
        price: 'Price',
        time: 'Time',
        rating: 'Rating',
        selectCourier: 'Select Courier'
      },
      routes: {
        title: 'Route Optimization',
        addStop: 'Add Stop',
        optimize: 'Optimize',
        optimized: 'Route optimized',
        timeSaved: 'minutes saved',
        distance: 'Distance'
      },
      deliveries: {
        title: 'Deliveries',
        status: 'Status',
        courier: 'Courier',
        cost: 'Cost',
        time: 'Time',
        pending: 'Pending',
        inTransit: 'In Transit',
        delivered: 'Delivered',
        advanceStatus: 'Advance Status'
      },
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;