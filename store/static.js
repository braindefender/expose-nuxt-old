import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export const state = () => ({
  sourceList: [
    {
      index: 0,
      title: 'ГПНТБ СО РАН',
      weekly: `Еженедельная выставка новых${String.fromCharCode(
        160,
      )}поступлений\nГПНТБ СО РАН`,
      image: weekly0,
      email: 'abonement@gpntbsib.ru',
      phones: ['+7 (383) 266-85-18'],
      sourceLink: '',
    },
    {
      index: 1,
      title: 'Отделение',
      weekly: `Еженедельная выставка новых${String.fromCharCode(
        160,
      )}поступлений\nотделения ГПНТБ СО РАН`,
      image: weekly1,
      email: 'branchconfhall@gpntbsib.ru',
      phones: ['+7 (383) 330-17-59'],
      sourceLink: 'http://prometeus.nsc.ru',
    },
    {
      index: 2,
      title: 'СибНСХБ',
      weekly: `Еженедельная выставка новых${String.fromCharCode(
        160,
      )}поступлений\nСибНСХБ – филиала ГПНТБ СО РАН`,
      image: weekly1,
      email: 'branchconfhall@gpntbsib.ru',
      phones: ['+7 (383) 330-17-59'],
      sourceLink: '',
    },
  ],
  sourceMod: [
    [
      {
        index: 0,
        title: 'Общее',
        alt: null,
        email: 'abonement@spsl.nsc.ru',
        phones: ['+7 (383) 266-17-59'],
        sourceLink: '',
      },
      {
        index: 1,
        title: 'Читальный зал №8',
        alt: 'Ч/З Периодики',
        email: 'narr@spsl.nsc.ru',
        phones: ['+7 (383) 266-15-78', '+7 (383) 266-75-71 доп. 138'],
        sourceLink: '',
      },
      {
        index: 2,
        title: 'Читальный зал №10',
        alt: 'Ч/З Справочной литературы',
        email: 'sbo@gpntbsib.ru',
        phones: ['+7 (383) 266-19-91'],
        sourceLink: '',
      },
    ],
    undefined,
    undefined,
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
