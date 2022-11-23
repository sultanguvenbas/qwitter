<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div
          class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
              class="new-qweet" bottom-slots v-model="newQweetContent"
              placeholder="What's happening?" counter maxlength="280" autogrow>
            <template
                v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn @click="addNewQweet" class="q-mb-lg" :disable="!newQweetContent" color="primary" label="Qweet" rounded
                 unelevated no-caps/>
        </div>
      </div>

      <q-separator class="divider" size="10px" color="grey-2"/>

      <q-list separator>
        <transition-group
            appear
            enter-active-class="animated fadeIn slow"
            leave-active-class="animated fadeOut slow"
        >
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
                <span class="text-grey-7">
                @sultanguvenbas
                <br class="lt-md"> &bull; {{ qweet.date | relativeDate }}
              </span>
              </q-item-label>

              <q-item-label class="qweet-content text-body1">{{ qweet.content }}</q-item-label>

              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                    flat
                    round
                    size="sm"
                    color="grey"
                    icon="far fa-comment"/>
                <q-btn
                    flat
                    round
                    size="sm"
                    color="grey"
                    icon="fas fa-retweet"/>
                <q-btn
                    flat
                    round
                    size="sm"
                    color="grey"
                    icon="far fa-heart"/>
                <q-btn
                    @click="deleteQweet(qweet)"
                    flat
                    round
                    size="sm"
                    color="grey"
                    icon="fas fa-trash"/>
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import {formatDistance} from 'date-fns'
import db from 'src/boot/firebase'
import { collection, query, onSnapshot } from "firebase/firestore";

export default {
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      // qweets: [
      //   {
      //     content: 'lorem',
      //     date: 1668992898876
      //   },
      //   {
      //     content: 'lorem',
      //     date: 1668992943438
      //   },
      // ]
    }
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now()
      }
      this.qweets.unshift(newQweet)
      this.newQweetContent = ''
    },
    deleteQweet(qweet) {
      let deleteToDate = qweet.date
      let index = this.qweets.findIndex(qweet => qweet.date === deleteToDate)
      this.qweets.splice(index, 1)
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date(), {addSuffix: true}) //TODO: check again
    }
  },
  mounted() {
    const q = query(collection(db, 'qweets'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log('New qweet: ', change.doc.data())
          this.qweets.unshift(change.doc.data())
        }
        if (change.type === 'modified') {
          console.log('Modified qweet: ', change.doc.data())
        }
        if (change.type === 'removed') {
          console.log('Removed qweet: ', change.doc.data())
        }
      });
    });
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
