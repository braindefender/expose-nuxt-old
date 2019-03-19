<template>
  <div class="fullscreen-container">
    <book-popup :book="book" :opened="false"/>
  </div>
</template>

<script>
import BookPopup from '~/components/expose/BookPopup';

export default {
  name: 'Test',
  components: { BookPopup },
  data() {
    return {
      book: {
        expose: {},
        covers:
          'https://expose-server.gpntbsib.ru/api/images/books/full_Архетипы_в_современном_социокультурном_пространстве_Ю_М_Перевозкина_О_О_Андронникова_И_А_Федосеева_Е_В_Ветерок_Мво_образования_и_науки_РФ_Новосиб_гос_пед_унт_.jpeg',
        title: 'Архетипы в современном социокультурном пространстве',
        year: 2017,
        source: 'НГПУ',
        pages: '162',
        authors: [
          'Перевозкина Ю.М.',
          'Андронникова О.О.',
          'Федосеева И.А.',
          'Ветерок Е.В.',
        ],
        author: '',
        annotation:
          'Монография посвящена одной из актуальных проблем современной психологии – изучению проявления архетипического в современном обществе. Акцент сделан на гендерной архетипизации личности. Представлен анализ современных методов изучения архетипов. В книге на большом фактическом материале исследуются манифестации архетипического в социокультурной реальности. Монография адресована студентам, аспирантам, преподавателям гуманитарных циклов, а также тем, кто интересуется проблемами бессознательного.',
        link:
          'http://webirbis.spsl.nsc.ru/irbis64r_01/cgi/cgiirbis_64.exe?Z21ID=&I21DBN=CAT&P21DBN=CAT&S21STN=1&S21REF=3&S21FMT=fullwebr&C21COM=S&S21CNR=20&S21P01=0&S21P02=1&S21P03=I=&S21STR=Г2018-10092%2A506915089',
        images: [
          'https://expose-server.gpntbsib.ru/api/images/books/Архетипы_в_современном_социокультурном_пространстве_Ю_М_Перевозкина_О_О_Андронникова_И_А_Федосеева_Е_В_Ветерок_Мво_образования_и_науки_РФ_Новосиб_гос_пед_унт__0.jpeg',
          'https://expose-server.gpntbsib.ru/api/images/books/Архетипы_в_современном_социокультурном_пространстве_Ю_М_Перевозкина_О_О_Андронникова_И_А_Федосеева_Е_В_Ветерок_Мво_образования_и_науки_РФ_Новосиб_гос_пед_унт__1.jpeg',
          'https://expose-server.gpntbsib.ru/api/images/books/Архетипы_в_современном_социокультурном_пространстве_Ю_М_Перевозкина_О_О_Андронникова_И_А_Федосеева_Е_В_Ветерок_Мво_образования_и_науки_РФ_Новосиб_гос_пед_унт__2.jpeg',
        ],
        info: [
          {
            name: 'ISBN',
            value: '978-5-00104-173-3',
          },
          {
            name: 'Город',
            value: 'Новосибирск',
          },
          {
            name: 'Предметная рубрика',
            value: 'Архетипы в культуре',
          },
          {
            name: 'Место хранения',
            value: 'Читальный зал №2',
          },
        ],
      },
    };
  },
};
</script>

<style lang="sass">
  @import '~/styles/mixins.sass'

  .fullscreen-container
    +posa(0px)
    display: flex
    align-items: center
    justify-content: center
    background-color: rgba(black, 0.1)
</style>
