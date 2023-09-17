<script lang='ts' setup>
import { ref } from 'vue';

export interface ListViewProps {
  title: string;
  isLoading: boolean;
}
withDefaults(defineProps<ListViewProps>(), {
  title: 'Title',
  isLoading: false
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="top-header">
    <span>{{ title }}</span>
    <q-btn color="secondary" icon="add" @click="dialog = true" />
  </div>

  <q-card v-if="isLoading">
    <q-card-section>
      <div class="text-center">
        <q-spinner-radio color="primary" size="4em" />
      </div>
    </q-card-section>
  </q-card>
  <slot name="content" v-else></slot>

  <q-dialog v-model="dialog" position="bottom" persistent>
    <q-card>
      <q-card-section>
        <div class="row q-mb-sm">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
        <slot name="form"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang='scss' scoped>
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  span {
    font-size: 1.5rem;
  }
}
</style>
