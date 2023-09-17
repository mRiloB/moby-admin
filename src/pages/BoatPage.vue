<script lang='ts' setup>
import { supabase } from 'src/composables/supabase';
import { ref, onMounted } from 'vue';
import ListView from 'src/components/ListView.vue';

interface Boat {
  id?: number;
  created_at: string;
  updated_at?: string;
  seller_id?: string;
  pos_id?: string;
  name: string;
  abbr: string;
  partner_id: string;
}

const boats = ref<Boat[]>([]);
const isLoading = ref<boolean>(false);
const text = ref<string>('');

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await supabase.from('boats').select('*');
    boats.value = res.data as Boat[];
  } catch (err) {
    console.log('err:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <q-page padding>
    <ListView :isLoading="isLoading" title="Embarcações">
      <template #content>
        <q-card class="partner-box" v-for="(el, key) in boats" :key="key">
          <span>{{ el.abbr }}</span>
          <span>{{ el.name }}</span>
          <q-separator class="q-my-sm" />
          <div class="row align-center justify-end q-mt-sm">
            <q-btn outline size="xs" icon="edit" class="q-mr-sm q-py-sm" />
          </div>
        </q-card>
      </template>
      <template #form>
        <q-form>
          <q-input v-model="text" outlined label="Abreviação" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Nome da Embarcação" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Vincular Parceiro" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Vincular Vendedor" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Vincular Maquineta" dense class="q-mb-sm" />
        </q-form>
      </template>
    </ListView>
  </q-page>
</template>

<style lang='scss' scoped>
.partner-box {
  color: $primary;
  margin-bottom: 10px;
  padding: 10px;

  span {
    margin-bottom: 5px;
  }

  span:nth-child(1) {
    font-size: 0.8rem;
    display: block;
  }
}
</style>
