<script setup lang="ts">
import { ref } from 'vue';
import MenuItem, { MenuItemProps } from 'components/MenuItem.vue';

const menuItems: MenuItemProps[] = [
  {
    title: 'Home',
    icon: 'home',
    route: 'home'
  },
  {
    title: 'Parceiros',
    icon: 'store',
    route: 'partner'
  },
  {
    title: 'Embarcações',
    icon: 'directions_boat',
    route: 'boat'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Moby App
        </q-toolbar-title>

        <div>v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" overlay :width="200" class="bg-primary">
      <q-list>
        <MenuItem v-for="item in menuItems" :key="item.title" v-bind="item" />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss"></style>
