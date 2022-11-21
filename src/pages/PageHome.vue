<template>
  <q-page>
    <div
        class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
            class="new-qweet" bottom-slots v-model="newQweetContent"
            placeholder="What's happening?" counter maxlength="280" autogrow >
          <template
              v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn class="q-mb-lg" :disable="!newQweetContent" color="primary" label="Qweet" rounded unelevated no-caps />
      </div>
    </div>

    <q-separator class="divider" size="10px" color="grey-2"/>

    <q-list separator>
      <q-item class="q-py-md"
              v-for="qweet in qweets"
              :key="qweet.date">
        <!--in the future you need to use id inside key-->
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong> Sultan Guvenbas</strong>
            <span class="text-grey-7">@sultanguvenbas</span>
          </q-item-label>

          <q-item-label class="qweet-content text-body1">{{qweet.content}}</q-item-label>

          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn flat
                   round
                   size="sm"
                   color="grey"
                   icon="far fa-comment"/>
            <q-btn flat
                   round
                   size="sm"
                   color="grey"
                   icon="fas fa-retweet"/>
            <q-btn flat
                   round
                   size="sm"
                   color="grey"
                   icon="far fa-heart"/>
            <q-btn flat
                   round
                   size="sm"
                   color="grey"
                   icon="fas fa-trash"/>
          </div>
        </q-item-section>

        <q-item-section side top>
          {{qweet.date | relativeDate}}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'

export default {
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      qweets: [
          {
        content: 'lorem',
        date:1668992898876
          },
        {
          content: 'lorem',
          date:1668992943438
        },
      ]
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date(), { addSuffix: true })
    }
  }
}

</script>
<style lang="sass">
.qweet-icons
  margin-left: -5px

.qweet-content
  white-space: pre-line
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
</style>
