<script lang='ts' setup>
import { ref } from 'vue';
import { supabase } from '../composables/supabase';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);

async function onSubmit () {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    await router.replace({ name: 'home' });
  } catch (err) {
    console.log('err:', err || err?.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <q-page padding>
    <q-card class="q-mx-auto" style="max-width: 400px;">
      <q-card-section>
        <h5>Login</h5>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input outlined type="email" v-model="email" label="E-mail" lazy-rules
            :rules="[val => val && val.length > 0 || 'Campo obrigarório']" />
          <q-input outlined type="password" v-model="password" label="Senha" lazy-rules
            :rules="[val => val && val.length > 0 || 'Campo obrigarório']" />
          <div>
            <q-btn :loading="isLoading" label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang='scss' scoped></style>
