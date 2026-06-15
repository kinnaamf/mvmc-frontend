import type { Product } from "~/types/product";
import type { Subscription } from "~/types/subscription";


export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    username: "sound_master",
    title: "Cyberpunk Ambient Pack",
    description: "Набор футуристичных звуков, дронов и эффектов для киберпанк атмосферы на стримах или в видео.",
    price: 490,
    is_purchased: false,
    avatar_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#ff007f",
    audio_url: ''
  },
  {
    id: 2,
    username: "beatmaker_pro",
    title: "Lo-Fi Beats for Study (Vol. 1)",
    description: "Расслабляющие чилловые биты без авторских прав. Идеально для фоновой музыки на стримах или кодинга.",
    price: 290,
    is_purchased: true,
    avatar_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#00f0ff",
    audio_url: ''
  },
  {
    id: 3,
    username: "synth_wave_kid",
    title: "Retro Synthwave Lead Patches",
    description: "Пресеты для популярных синтезаторов в стиле 80-х. Жирные лиды и ностальгические басы.",
    price: 890,
    is_purchased: false,
    avatar_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#ffaa00",
    audio_url: ''
  },
  {
    id: 4,
    username: "phonk_house",
    title: "Phonk Drum Kit & Cowbells",
    description: "Эксклюзивные агрессивные ковбеллы, перегруженные 808-е басы и сочные снейры для фонка.",
    price: 350,
    is_purchased: false,
    avatar_url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#9d00ff",
    audio_url: ''
  },
  {
    id: 5,
    username: "voice_effects",
    title: "Donation samples",
    description: "Нарезка культовых и мемных фраз, обработанных и готовых для интеграции в OBS/DonationAlerts.",
    price: 150,
    is_purchased: true,
    avatar_url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#00ff66",
    audio_url: ''
  },
  {
    id: 6,
    username: "game_audio",
    title: "8-Bit Retro Sound FX",
    description: "Более 100 звуков прыжков, взрывов, монет и выстрелов в стиле старых консолей NES/Sega.",
    price: 400,
    is_purchased: false,
    avatar_url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#e60000",
    audio_url: ''
  }
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 101,
    username: "tech_guru",
    title: "Доступ к VIP-чату инсайдеров",
    description: "Закрытое комьюнити разработчиков. Обсуждение архитектуры, приватные стримы и созвоны раз в неделю.",
    price: 990,
    is_purchased: true,
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#7000ff"
  },
  {
    id: 102,
    username: "designer_hub",
    title: "Ежемесячный пак UI-компонентов",
    description: "Подписка на свежие исходники: Figma файлы, готовые Tailwind/Vue компоненты и 3D иллюстрации.",
    price: 1500,
    is_purchased: false,
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#39ff14"
  },
  {
    id: 103,
    username: "guitar_lessons",
    title: "Приватные табы и разборы треков",
    description: "Разборы сложных соло, гитарные лайфхаки, кастомные пресеты для плагинов (Neural DSP, Nembrini) и табулатуры.",
    price: 600,
    is_purchased: false,
    avatar_url: "https://images.unsplash.com/photo-1525201548942-d8c8bc0ddae7?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#ff5500"
  },
  {
    id: 104,
    username: "cyber_спорт",
    title: "Аналитика матчей и гайды",
    description: "Разбор профессиональных демок, неочевидные раскидки, тактики и личные советы по поднятию ELO.",
    price: 450,
    is_purchased: true,
    avatar_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#00ccff"
  },
  {
    id: 105,
    username: "code_reviews",
    title: "Ревью вашего кода каждый месяц",
    description: "Уровень подписки для тех, кто хочет расти. Разбираю один ваш pull-request в месяц, указываю на ошибки и архитектурные проблемы.",
    price: 3000,
    is_purchased: false,
    avatar_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=150&h=150&q=80",
    ring_color: "#ffd700" // Золотой
  }
];