import image0 from '~/assets/images/jon-grogan-518345-unsplash.jpg';
import image1 from '~/assets/images/joao-silas-29233-unsplash.jpg';
import image2 from '~/assets/images/ant-rozetsky-140870-unsplash.jpg';
import image3 from '~/assets/images/ren-ran-232078-unsplash.jpg';

export const state = () => ({
  catalogueList: [
    {
      image: image0,
      title: 'Выставка книг, посвящённых строительству',
      source: 1,
      workerID: '',
      dates: {
        public: '2018-11-15',
        create: '2018-11-15',
      },
      creator: 'Селиванова Ирина',
    },
    {
      image: image1,
      title:
        'Выставка книг, посвящённых географии, геодезии и ещё чему-то, связанному с Землёй',
      source: 1,
      dates: {
        public: '2018-11-15',
        create: '2018-11-15',
      },
      creator: 'Костюк Даниил',
    },
    {
      image: image2,
      title: 'Выставка книг, посвящённых машиностроению',
      source: 1,
      dates: {
        public: '2018-11-15',
        create: '2018-11-15',
      },
    },
    {
      image: image3,
      title: 'Выставка книг, посвящённых ботанике',
      source: 1,
      dates: {
        public: '2018-11-15',
        create: '2018-11-15',
      },
    },
  ],
  categoryList: [
    {
      title: 'Библиотечное дело',
      date: '25 декабря, 2018',
      count: '16',
      image: image0,
    },
    {
      title: 'Археология. Геодезия',
      date: '28 декабря, 2018',
      count: '22',
      image: image1,
    },
  ],
});

export const mutations = {};
export const actions = {};
