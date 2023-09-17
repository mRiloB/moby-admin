<script lang='ts' setup>
import { supabase } from 'src/composables/supabase';
import { ref, onMounted } from 'vue';
import ListView from 'src/components/ListView.vue';

interface Partner {
  id?: number;
  created_at: string;
  cnpj: string;
  name: string;
  address: string;
  owner: string;
  phones?: string;
  email?: string;
  updated_at?: string | null;
}

const partners = ref<Partner[]>([]);
const isLoading = ref<boolean>(false);
const text = ref<string>('');

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await supabase.from('partner').select('*');
    partners.value = res.data as Partner[];
  } catch (err) {
    console.log('err:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <q-page padding>
    <ListView :isLoading="isLoading" title="Parceiros">
      <template #content>
        <q-card class="partner-box" v-for="(el, key) in partners" :key="key">
          <span>{{ el.cnpj }}</span>
          <span>{{ el.name }}</span>
          <q-separator class="q-my-sm" />
          <div class="row align-center justify-end q-mt-sm">
            <q-btn outline size="xs" icon="edit" class="q-mr-sm q-py-sm" />
          </div>
        </q-card>
      </template>
      <template #form>
        <q-form>
          <q-input v-model="text" outlined label="CNPJ" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Nome da Empresa" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Nome do Propietário" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Endereço" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Contato" dense class="q-mb-sm" />
          <q-input v-model="text" outlined label="Email" dense class="q-mb-sm" />
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
