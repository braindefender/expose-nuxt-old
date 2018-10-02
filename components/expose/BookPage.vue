<template>

  <div class="book-page">
    <div class="book-page__return">
      <div class="book-page__return-image">
        <img :src="image1" alt="">
      </div>
      <a href="#" class="book-page__return-link">
        Еженедельная выставка новых поступлений отделения ГПНТБ СО РАН
      </a>
    </div>
    <div class="book-page__wrapper">
      <div class="book-page__side">
        <div class="book-image">
          <div class="book-image__blur">
            <div class="book-image__blur-container">
              <img :src="image" alt="">
            </div>
          </div>
          <div class="book-image__image">
            <img :src="image" alt="">
          </div>
        </div>
        <div class="book-page__button">
          <a href="#" class="button">Перейти в каталог</a>
        </div>
      </div>
      <div class="book-page__content">
        <div class="book-page__authors">
          Белов Н.А., Белов В.Д., Дашкевич Н.И.
        </div>
        <div class="book-page__title">
          Фазовый состав многокомпонентных гамма-сплавов
          на основе алюминидов титана: учеб. пособие
        </div>
        <div class="book-page__source">
          ВИАМ, 2018
        </div>
        <div class="book-page__annotation">
          В&nbsp;учебном пособии обобщены результаты экспериментальных и&nbsp;
          расчетных исследований авторов в&nbsp;области многокомпонентных
          гамма-сплавов на&nbsp;основе алюминидов титана. С&nbsp;использованием
          программы Thermo-Calc проанализировано влияние наиболее часто
          используемых легирующих элементов на&nbsp;структуру и&nbsp;фазовый
          состав. Приведены результаты экспериментальных плавок
          по&nbsp;приготовлению гамма-сплавов типа TNM.
          <br>
          <br>
          Книга рассчитана на&nbsp;широкий круг специалистов,
          которые используют для работы гамма-сплавы, а&nbsp;также
          может быть полезна аспирантам и&nbsp;магистрантам,
          обучающимся по&nbsp;материаловедческим специальностям,
          прежде всего в&nbsp;области легких сплавов,
          при выполнении диссертационных и&nbsp;квалификационных работ,
          связанных с&nbsp;гамма-сплавами.
        </div>
        <div class="book-page__info">
          <div class="book-page__info-line">
            <div class="book-page__info-cell book-page__info-cell--bold">Страниц:</div>
            <div class="book-page__info-cell">335</div>
          </div>
          <div class="book-page__info-line">
            <div class="book-page__info-cell book-page__info-cell--bold">Тип документа:</div>
            <div class="book-page__info-cell">Статья, Книга или Патент</div>
          </div>
          <div class="book-page__info-line">
            <div class="book-page__info-cell book-page__info-cell--bold">
              Информация<br>об источнике:
            </div>
            <div class="book-page__info-cell">
              Из какого журнала, книги.<br>
              Информация об ее авторе и т.п.
            </div>
          </div>
          <div class="book-page__info-line">
            <div class="book-page__info-cell book-page__info-cell--bold">ISBN:</div>
            <div class="book-page__info-cell">8-800555-3535</div>
          </div>
          <div class="book-page__info-line">
            <div class="book-page__info-cell book-page__info-cell--bold">Место хранения:</div>
            <div class="book-page__info-cell">Отделение ГПНТБ СО РАН</div>
          </div>
          <div class="book-page__info-line">
            <div class="book-page__info-cell book-page__info-cell--bold">Шифр:</div>
            <div class="book-page__info-cell">К2-Б435</div>
          </div>
        </div>
      </div>
    </div>
    <div class="book-page__images">
      <div class="book-page__image"></div>
      <div class="book-page__image"></div>
      <div class="book-page__image"></div>
      <div class="book-page__image"></div>
      <div class="book-page__image"></div>
    </div>
    <div class="book-contents">
      <div class="book-contents__title">Содержание</div>
      <div class="book-contents__text">
        Введение .......................................................... 5<br>
        <br>
        ГЛАВА 1. О государственной политике в сфере науки и инноваций ..... 7<br>
        <br>
        ГЛАВА 2. Теоретические и методические основы бюджетирования,<br>
                ориентированного на результат ........................... 19<br>
        <br>
        Концепция БОР .................................................... 19<br>
        <br>
        Практический опыт внедрения системы БОР .......................... 28<br>
        <br>
        ГЛАВА 3. Программно-целевое формирование бюджета на 2012 г.<br>
                и плановый период 2013-2014 гг. ......................... 35<br>
        <br>
        Основные параметры ............................................... 35<br>
        <br>
        Программно-целевое формирование бюджета 2012-2014 гг.<br>
        и проблемы бюджетного финансирования науки ....................... 39<br>
        <br>
        ГЛАВА 4. Новые механизмы бюджетного обеспечения  деятельности<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        государственных академий наук ........................... 50<br>
        <br>
        Методические основы .............................................. 51<br>
        <br>
        Автономные, бюджетные и казенные учреждения ...................... 53<br>
        <br>
        Формирование государственного (муниципального) задания ........... 59<br>
        <br>
        Разработка нормативов затрат на оказание государственных услуг ... 63<br>
        <br>
        Механизм субсидий ................................................ 67<br>
        <br>
        «Академические» проблемы ......................................... 74<br>
        <br>
        ГЛАВА 5. ДРОНД как инструмент бюджетирования, ориентированного<br>
                на результат ............................................ 78<br>
        <br>
        Методические подходы ............................................. 78<br>
        <br>
        ДРОНД Минобрнауки России ......................................... 83<br>
        <br>
        ДРОНД Минэкономразвития России ................................... 89<br>
        <br>
        ГЛАВА 6. Особенности налогообложения государственных<br>
                (муниципальных) предприятий ............................ 101<br>
        <br>
        Общие проблемы налогообложения .................................. 102<br>
        <br>
        Направления реформирования системы налогов и сборов в сфере<br>
        науки и инноваций ............................................... 110<br>
        <br>
        ПРИЛОЖЕНИЕ 1. Зарубежный опыт организации бюджетирования,<br>
        ориентированного на результат ................................... 117<br>
        <br>
        ПРИЛОЖЕНИЕ 2. Порядок разработки, реализации и оценки<br>
        эффективности государственных программ Российской Федерации ..... 163<br>
        <br>
        ПРИЛОЖЕНИЕ 3. Концепция государственной программы<br>
        «Единая программа фундаментальных исследований на 2013-2020<br>
        годы» ........................................................... 181<br>
        <br>
        Литература ...................................................... 206<br>
      </div>
    </div>
  </div>

</template>

<script>
import image from '@/assets/covers/public01032012112432_b.jpg';
import image1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export default {
  name: 'BookPage',
  data() {
    return {
      image,
      image1,
    };
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'

  .book-page
    box-sizing: border-box
    color: black
    width: 890px
    padding-left: 60px
    padding-right: 60px
    padding-top: 30px
    padding-bottom: 30px
    margin: 0 auto
    &__return
      max-width: 770px
      margin-bottom: 30px
      position: relative
      z-index: 5
      border-radius: 5px
      overflow: hidden
      &::after
        +posa(0)
        content: ''
        background-color: rgba(black, 0.4)
    &__return-image
      +posa(0)
      display: flex
      align-items: center
      img
        width: 100%
        animation: slide 20s alternate infinite ease-in-out
    &__return-link
      +tdn
      position: relative
      z-index: 10
      display: flex
      align-items: center
      height: 60px
      padding-left: 50px
      color: white
      &::after
        +posa(0)
        left: 20px
        right: auto
        width: 15px
        content: ''
        background: url('~/assets/icon-chevron-left.svg') center center no-repeat
    &__wrapper
      display: flex
      flex-direction: row
    &__side
      width: 240px
      margin-right: 30px
      .book-image
        margin-bottom: 30px
    &__content
      width: 500px
      padding-top: 20px
    &__authors
      font-size: 16px
      line-height: 20px
      margin-bottom: 10px
    &__title
      font-size: 20px
      line-height: 22px
      margin-bottom: 16px
      font-weight: bold
    &__source
      font-size: 16px
      line-height: 20px
      margin-bottom: 16px
    &__annotation
      font-size: 14px
      line-height: 18px
      font-style: italic
      text-align: justify
      margin-bottom: 20px
      opacity: 0.8
    &__info
      margin-bottom: 30px
    &__info-line
      display: flex
      flex-direction: row
      justify-content: space-between
      margin-bottom: 10px
      &::last-child
        margin-bottom: 0
    &__info-cell
      font-size: 14px
      line-height: 16px
      max-width: 250px
      &:first-child
        text-align: left
      &:last-child
        text-align: right
      &--bold
        font-weight: bold
    &__images
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      min-height: 200px
      margin-bottom: 30px
    &__image
      width: 140px
      height: 200px
      border-radius: 5px
      background-color: #333

  .book-contents
    text-align: center
    &__title
      text-align: center
      margin-bottom: 30px
      font-size: 18px
      font-weight: bold
    &__text
      padding: 36px
      background-color: #f2f2f2
      border-radius: 5px
      font-size: 13px
      line-height: 15px
      font-family: 'PT Mono'
      text-align: justify
      display: inline-block

</style>
