<template>
  <div class="main">
    <Header/>

    <section class="cover-section" :style="`background-image: url(${cover})`">
      <div class="cover-section__content">
        <h1>Каталог выставок ГПНТБ СО РАН</h1>
      </div>
    </section>

    <section class="content-section">
      <cards-container
        :title="'Демонстрируемые'"
        :action="{ title: 'Смотреть все', link: 'current' }"
      >
        <slider/>
      </cards-container>

      <cards-container
        :title="'Недавно добавленные'"
        :action="{ title: 'Смотреть все', link: 'catalogue' }"
        :preload="catalogueList == undefined"
      >
        <expose-card v-for="(item, index) in catalogueList" :key="index" :item="item"/>
      </cards-container>

      <!-- <cards-container
        :title="'Недавно обновлённые коллекции'"
        :action="{ title: 'Смотреть все', link: 'collections' }"
        :preload="collectionList == undefined"
      >
        <collection-card v-for="(item, index) in collectionList" :key="index" :item="item"/>
        <expose-card-preload v-if="collectionList == undefined"/>
        <expose-card-preload v-if="collectionList == undefined"/>
        <expose-card-preload v-if="collectionList == undefined"/>
        <expose-card-preload v-if="collectionList == undefined"/>
        <expose-card-preload v-if="collectionList == undefined"/>
        <expose-card-preload v-if="collectionList == undefined"/>
      </cards-container>-->
    </section>

    <section v-if="preload" class="content-section content-section--preload">
      <!-- <slider-preload/> -->
    </section>
  </div>
</template>

<script>
import cover from '~/assets/images/alfons-morales-410757-unsplash.jpg';

import CardsContainer from '~/components/expose/CardsContainer';
import CollectionCard from '~/components/expose/CollectionCard';
import ExposeCard from '~/components/expose/ExposeCard';
import ExposeCardPreload from '~/components/expose/ExposeCardPreload';

import CataloguePreviewPreload from '~/components/expose/catalogue/CataloguePreviewPreload';
import Header from '~/components/common/Header';
import Slider from '~/components/expose/slider/Slider';
import SliderPreload from '~/components/expose/slider/SliderPreload';

export default {
  components: {
    CardsContainer,
    ExposeCard,
    ExposeCardPreload,
    CollectionCard,
    CataloguePreviewPreload,
    Header,
    Slider,
    SliderPreload,
  },
  name: 'Main',
  data() {
    return {
      cover,
      catalogueList: undefined,
      collectionList: undefined,
      local: false,
      preload: true,
    };
  },
  mounted() {
    if (!this.local) {
      this.$axios.$get('/catalogue/main').then(res => {
        this.preload = false;
        this.catalogueList = res.catalogueList;
        this.collectionList = res.collectionList;
      });
      // this.$axios.$get('/public_api/get_lastcollections').then(res => {
      //   this.categories;
      // });
    } else {
      this.catalogueList = this.$store.state.local.catalogueList;
      this.collectionList = this.$store.state.local.collectionList;
    }
  },
};
</script>

<style lang="sass">
  @import '~/styles/main.sass'
</style>
