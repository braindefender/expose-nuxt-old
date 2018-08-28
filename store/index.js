import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export const state = () => ({
  currentPage: 0,
  pageList: [
    { name: 'info', title: 'Информация' },
    { name: 'sort', title: 'Сортировка' },
    { name: 'edit', title: 'Редактирование' },
    { name: 'demo', title: 'Предпоказ' },
  ],
  modeList: [
    { index: 0, mode: 'weekly', title: 'Еженедельная выставка' },
    { index: 1, mode: 'theme', title: 'Тематическая выставка' },
  ],
  sourceList: [
    {
      index: 0,
      title: 'ГПНТБ СО РАН',
      weekly: `Еженедельная выставка новых поступлений\nГПНТБ СО РАН`,
      image: weekly0,
      email: 'abonement@gpntbsib.ru',
      phone: '+7 (913) 001-4485',
    },
    {
      index: 1,
      title: 'Отделение ГПНТБ СО РАН',
      weekly: `Еженедельная выставка новых поступлений\nотделения ГПНТБ СО РАН`,
      image: weekly1,
      email: 'abonement@gpntbsib.ru',
      phone: '+7 (913) 001-4485',
    },
  ],
});

export const mutations = {
  setState(state, payload) {
    state.state = payload;
  },
};
