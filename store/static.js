import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export const state = () => ({
  sourceList: [
    {
      index: 0,
      title: 'ГПНТБ СО РАН',
      weekly: `Еженедельная выставка новых${String.fromCharCode(160)}поступлений\nГПНТБ СО РАН`,
      image: weekly0,
      email: 'abonement@gpntbsib.ru',
      phone: '+7 (383) 266-85-18',
    },
    {
      index: 1,
      title: 'Отделение ГПНТБ СО РАН',
      weekly: `Еженедельная выставка новых${String.fromCharCode(160)}поступлений\nотделения ГПНТБ СО РАН`,
      image: weekly1,
      email: 'branchconfhall@gpntbsib.ru',
      phone: '+7 (383) 330-17-59',
    },
  ],
  months: [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ],
  bookSourceMap: {
    'м.': 'Москва',
    'л.': 'Ленинград',
    'спб.': 'Санкт-Петербург',
    спб: 'Санкт-Петербург',
  },
  modeList: [
    { index: 0, mode: 'weekly', title: 'Еженедельная' },
    { index: 1, mode: 'theme', title: 'Тематическая' },
  ],
  pageList: [
    { name: 'Info', title: '1. Информация' },
    { name: 'Sort', title: '2. Сортировка' },
    { name: 'Edit', title: '3. Редактирование' },
    { name: 'Demo', title: '4. Предпоказ' },
  ],
  statusList: [
    { name: 'work', title: 'В работе' },
    { name: 'public', title: 'Опубликованные' },
    { name: 'waiting', title: 'Ожидающие публикации' },
  ],
  listSortTypes: [
    { index: 0, title: 'по дате обновления', mode: 'update' },
    { index: 1, title: 'по дате создания', mode: 'create' },
    { index: 2, title: 'по дате публикации', mode: 'public' },
  ],
});
