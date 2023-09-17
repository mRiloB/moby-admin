<script setup lang="ts">
export interface MenuItemProps {
  title: string;
  route?: string;
  icon?: string;
}
withDefaults(defineProps<MenuItemProps>(), {
  route: 'home',
  icon: '',
});
</script>

<template>
  <q-item clickable :to="{ name: route }">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" color="accent" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="bg-primary">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
