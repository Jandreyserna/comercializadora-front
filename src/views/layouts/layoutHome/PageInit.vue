<template>
    <AuthHeader></AuthHeader>
    <AuthContent></AuthContent>
    
</template>

<script>
import AuthHeader from './AuthHeader.vue'
import AuthContent from './AuthContent.vue'

export default {
    name: 'PageInit',
    components: {
        AuthHeader,
        AuthContent,
    }
}
</script>