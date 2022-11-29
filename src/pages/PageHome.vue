<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
                  v-for="qweet in qweets.value"
                  :key="qweet.id">
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
                <br class="lt-md"> &bull; {{ qweet.date }}
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
                    @click="toggleQweet(qweet)"
                    flat
                    round
                    size="sm"
                    :color="qweet.liked ? 'pink' : 'grey' "
                    :icon= "qweet.liked ? 'fa-solid fa-heart' : 'far fa-heart' "
                    />
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
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy  } from "firebase/firestore";
import db from 'src/boot/firebase'

export default {
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      qweets: []
    }
  },
  methods: {
    async addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false
      }
      // this.qweets.unshift(newQweet)
      await addDoc(collection(db, "qweets"), newQweet);
      this.newQweetContent = ''
    },
    deleteQweet(qweet) {
      deleteDoc(doc(db, "qweets", qweet.id));
      // let deleteToId = qweet.id
      // console.log(deleteToId)
      // let index = this.qweets.findIndex(qweet => qweet.id === deleteToId)
      // this.qweets.splice(index, 1)
    },
    async toggleQweet(qweet) {
      const qweetRef = doc(db, "qweets", qweet.id);
      await updateDoc(qweetRef, {
        liked: !qweet.liked
      });
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date()) //TODO: check again
    }
  },
  mounted() {
    onSnapshot(collection(db, 'qweets'), (querySnapshot) => {
      const qweetArr = [];
      querySnapshot.forEach((doc) => {
        const q= {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date,
          liked: doc.data().liked
        }
        qweetArr.push(q)
      })
      this.qweets.value= qweetArr
      //TODO order by date
    })

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
