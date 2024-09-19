<script setup lang="ts">
defineProps<{title?: string}>()
const emit = defineEmits<{(e: 'closeModal', bool: boolean): void}>()

const handleCloseModal = (bool: boolean) => {
  emit('closeModal', bool );
};
</script>

<template>
<div class="modal-backdrop" @click="handleCloseModal(false)"></div>
<div class="modal">
    <h3 class="modal__title" v-if="title">{{ title }}</h3>

    <slot/>
</div>
</template>

<style scoped lang="scss">
.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .5;
    z-index: 0;
}

.modal {
    padding: 10px;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: whitesmoke;
    z-index: 1;

    &__title {
        padding-left: 20px;
        font-size: 20px;
    }
}
</style>
